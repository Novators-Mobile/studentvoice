import React, { useEffect, useState } from "react";
import Select from "../components/Select";
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleButtons from "../components/ToggleButtons";
import DatePicker from "../components/DatePicker";
import Button from "../components/Button";
import { getDisciplines, TDiscipline } from "../api/disciplineApi";
import { getTeachers, TTeacher } from "../api/teacherApi";
import { disciplinesToOption, teachersToOption } from "../utils/adapter";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// const time = ["Не повторять", "Ежедневно", "Еженедельно", "Каждый будний день"];
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

type LessonForm = {
  date: string;
  discipline: string;
  teacher: string;
  startTime: string;
  endTime: string;
  format: string;
};

function EditLesson() {
  const navigate = useNavigate();
  
  const location = useLocation();
  let title: string = "";
  let decryption: string = "";
  const normalizedPath = location.pathname.replace(/\/$/, "");
  if (normalizedPath.endsWith("edit")) {
    title = "Название пары";
    decryption = "Расшифровка аббревиатуры";
  } else if (normalizedPath.endsWith("new-lesson")) {
    title = "Новая пара";
  }
  
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [teachers, setTeachers] = useState<TTeacher[]>([]);

  const { handleSubmit, control, formState: { errors } } = useForm<LessonForm>({
    defaultValues: {
      date: "",
      discipline: "",
      teacher: "",
      startTime: "",
      endTime: "",
      format: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disciplinesData = await getDisciplines({});
        const teachersData = await getTeachers({});
        setDisciplines(disciplinesData);
        setTeachers(teachersData);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<LessonForm> = async (data) => {
    console.log("Данные формы:", data);
    // navigate(-1);
  };

  return (
    <>
      <div className="title-block__wrap">
        <h1 className="header-text">{title}</h1>
        <p className="title__decryption medium-middle-text">{decryption}</p>
      </div>

      <form className="edit-lesson__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset-container">
          <Controller
            name="date"
            control={control}
            rules={{ required: "Дата обязательна" }}
            render={({ field }) => (
              <DatePicker
                label="Дата"
                error={errors.date?.message}
                onChange={field.onChange}
                ref={field.ref}
              />
            )}
          />
          <Controller
            name="discipline"
            control={control}
            rules={{ required: "Дисциплина обязательна" }}
            render={({ field }) => (
              <Select
                label="Дисциплина"
                options={disciplinesToOption(disciplines)}
                error={errors.discipline?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="teacher"
            control={control}
            rules={{ required: "Преподаватель обязателен" }}
            render={({ field }) => (
              <Select
                label="Преподаватель"
                options={teachersToOption(teachers)}
                error={errors.teacher?.message}
                {...field}
              />
            )}
          />
        </fieldset>

        <fieldset className="fieldset-container">
          <div className="edit-lesson__inner_wrap">
            <p className="medium-middle-text">Время</p>
            <div className="edit-lesson__time_wrap">
              <Controller
                name="startTime"
                control={control}
                rules={{ required: "Время начала обязательно" }}
                render={({ field }) => (
                  <Input type="time" error={errors.startTime?.message} {...field} />
                )}
              />
              <span></span>
              <Controller
                name="endTime"
                control={control}
                rules={{ required: "Время окончания обязательно" }}
                render={({ field }) => (
                  <Input type="time" error={errors.endTime?.message} {...field} />
                )}
              />
            </div>
          </div>

          <div className="edit-lesson__inner_wrap">
            <p className="medium-middle-text">Формат</p>
            <Controller
              name="format"
              control={control}
              rules={{ required: "Формат обязателен" }}
              render={({ field }) => (
                <ToggleButtons buttons={toggleButtons} {...field} />
              )}
            />
          </div>
        </fieldset>

        <div className="edit__form-btns">
          <Button text="Отменить" type="reset" onClick={() => navigate(-1)} />
          <Button text="Сохранить" type="submit" />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditLesson);
