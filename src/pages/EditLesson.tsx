import React, { useEffect, useState } from "react";
import Select from "../components/Select";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import ToggleButtons from "../components/ToggleButtons";
import DatePicker from "../components/DatePicker";
import Button from "../components/Button";
import { getDisciplines, TDiscipline } from "../api/admin/disciplineApi";
import { getTeachers, TTeacher } from "../api/admin/teacherApi";
import { disciplinesToOption, teachersToOption } from "../utils/adapter";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Skeleton from "../components/Skeleton";
import {
  getLesson,
  postLesson,
  putLesson,
  TLesson,
} from "../api/admin/lessonApi";
import dayjs from "dayjs";
import { AlertLoading, AlertUpdate } from "../utils/Notifications";

const selectWidth = "480px";

const toggleButtons = [
  {
    id: "lecture",
    text: "Лекция",
    name: "format",
  },
  {
    id: "practice",
    text: "Практика",
    name: "format",
  },
];

function EditLesson() {
  const navigate = useNavigate();

  const { disciplineId, teacherId, lessonId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [teachers, setTeachers] = useState<TTeacher[]>([]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLesson>({
    defaultValues: {
      subject: undefined,
      date: "",
      teacher: undefined,
      type: undefined,
      time: "",
      name: ""
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const teachersData = await getTeachers({ subjectId: disciplineId });
        const disciplinesData = await getDisciplines({ teacherId: teacherId });
        // const teachersData = await getTeachers({ });
        setTeachers(teachersData);
        setDisciplines(disciplinesData);

        if (disciplineId) {
          reset({ subject: Number(disciplineId) });
        } else if (teacherId) {
          reset({ teacher: Number(teacherId) });
        } else if (lessonId) {
          const lessonData = await getLesson(lessonId);
          reset({
            subject: lessonData.subject,
            date: lessonData.date,
            teacher: lessonData.teacher,
            type: lessonData.type,
            time: dayjs(lessonData.date).format("HH:mm").toString(),
            name: lessonData.name
          });
        }
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [disciplineId, teacherId, lessonId, reset]);

  const onSubmit: SubmitHandler<TLesson> = async (data) => {
    const datePart = dayjs(data.date);
    const [hours, minutes] = data.time!.split(":").map(Number);
    const combinedDate = datePart.set("hour", hours).set("minute", minutes);

    const transformedData = {
      ...data,
      date: combinedDate.toJSON(),
      time: undefined,
    };

    const loadingToast = AlertLoading("Отправка...");
    try {
      if (lessonId) {
        await putLesson(lessonId, transformedData);
        AlertUpdate(loadingToast, "success", "Пара обновлена успешно!");
      } else {
        await postLesson(transformedData);
        AlertUpdate(loadingToast, "success", "Пара создана успешно!");
      }
      navigate(-1);
    } catch (err) {
      AlertUpdate(loadingToast, "error", "Ошибка при отправке данных");
      console.error("Ошибка при отправке данных: ", err);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="title-block__wrap">
        <h1 className="header-text">
          {lessonId ? "Название пары" : "Новая пара"}
        </h1>
        <p className="title__decryption medium-middle-text">
          {!!lessonId && "Расшифровка"}
        </p>
      </div>

      <form className="edit-lesson__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset-container datetime">
          <Controller
            name="date"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <DatePicker
                label="Дата"
                error={errors.date?.message}
                onChange={field.onChange}
                ref={field.ref}
                value={
                  field.value ? dayjs(field.value).format("DD.MM.YYYY") : ""
                }
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <Input
                type="time"
                label="Время"
                error={errors.time?.message}
                {...field}
              />
            )}
          />
        </fieldset>

        <fieldset className="fieldset-container">
          <Controller
            name="subject"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <Select
                label="Дисциплина"
                options={disciplinesToOption(disciplines)}
                error={errors.subject?.message}
                value={field.value}
                onChange={(id) => field.onChange(id)}
                width={selectWidth}
                disable={!!disciplineId || !!lessonId}
              />
            )}
          />
          <Controller
            name="teacher"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <Select
                label="Преподаватель"
                options={teachersToOption(teachers)}
                error={errors.teacher?.message}
                value={field.value}
                onChange={(id) => field.onChange(id)}
                width={selectWidth}
                disable={!!teacherId || !!lessonId}
              />
            )}
          />
        </fieldset>

        <fieldset className="fieldset-container">
          <div className="edit-lesson__inner_wrap">
            <p className="input-label medium-middle-text">Формат</p>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <ToggleButtons
                  buttons={toggleButtons}
                  error={errors.type?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="edit-lesson__inner_wrap">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Обязательное поле",
                maxLength: {
                  value: 100,
                  message: "Макс. число символов 100",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Название пары"
                  width={selectWidth}
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />
          </div>
        </fieldset>

        <div className="edit__form-btns">
          <Button
            text="Отменить"
            type="reset"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          />
          <Button
            text={lessonId ? "Обновить" : "Сохранить"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditLesson);
