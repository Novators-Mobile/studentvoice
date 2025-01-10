import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { getInstitutes, TInstitute } from "../../api/admin/institutesApi";
import { institutesToOption } from "../../utils/adapter";
import {
  getTeacher,
  postTeacher,
  putTeacher,
  TTeacher,
} from "../../api/admin/teacherApi";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";
import Skeleton from "../../components/Skeleton";
import SearchableSelectDiscipline from "../../components/SearchableSelectDiscipline";
import { getDisciplines, TDiscipline } from "../../api/admin/disciplineApi";

function EditTeacher() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { teacherId } = useParams();
  const [disciplines, setDisciplines] = useState<TDiscipline[]>();
  const [institutes, setInstitutes] = useState<TInstitute[]>([]);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TTeacher>({
    defaultValues: {
      second_name: "",
      first_name: "",
      patronymic: "",
      university: undefined,
      email: "",
      username: "",
      lecture_subjects: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const institutesData = await getInstitutes();
        setInstitutes(institutesData);

        if (teacherId) {
          const teacherData = await getTeacher(teacherId);
          reset({
            second_name: teacherData.second_name,
            first_name: teacherData.first_name,
            patronymic: teacherData.patronymic,
            university: teacherData.university,
            email: teacherData.email,
            username: teacherData.username,
            lecture_subjects: teacherData.lecture_subjects
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
  }, [teacherId, reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const disciplinesData = await getDisciplines({teacherId: teacherId});
        const disciplinesData = await getDisciplines({});
        setDisciplines(disciplinesData);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<TTeacher> = async (data) => {
    const loadingToast = AlertLoading("Отправка...");
    try {
      if (teacherId) {
        await putTeacher(teacherId, data);
        AlertUpdate(loadingToast, "success", "Профиль обновлён успешно!");
      } else {
        await postTeacher(data);
        AlertUpdate(loadingToast, "success", "Профиль создан успешно!");
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
      <h1 className="edit__title header-text">
        {teacherId ? "Редактировать профиль" : "Новый профиль преподавателя"}
      </h1>

      <form className="edit-teacher__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Персональная информация
          </legend>

          <div className="fieldset-container">
            <Controller
              name="second_name"
              control={control}
              rules={{
                required: "Обязательное поле",
                maxLength: {
                  value: 30,
                  message: "Макс. число символов 30",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Фамилия"
                  error={errors.second_name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: "Обязательное поле",
                maxLength: {
                  value: 150,
                  message: "Макс. число символов 150",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Имя"
                  error={errors.first_name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="patronymic"
              control={control}
              rules={{
                required: "Обязательное поле",
                maxLength: {
                  value: 30,
                  message: "Макс. число символов 30",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Отчество"
                  error={errors.patronymic?.message}
                  {...field}
                />
              )}
            />
          </div>
        </fieldset>

        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Профессиональная информация
          </legend>

          <div className="edit-teacher__big-wrap">
            <div className="fieldset-container">
              <Controller
                name="university"
                control={control}
                rules={{ required: "Обязательное поле" }}
                render={({ field }) => (
                  <Select
                    label="Институт"
                    options={institutesToOption(institutes)}
                    placeholder="Выбор института..."
                    width="950px"
                    error={errors.university?.message}
                    value={field.value}
                    onChange={(id) => field.onChange(id)}
                  />
                )}
              />
            </div>

            <div className="fieldset-container">
              <Controller
                name="lecture_subjects"
                control={control}
                rules={{ required: "Обязательное поле" }}
                render={({ field }) => (
                  <SearchableSelectDiscipline
                    label="Лекции"
                    value={field.value}
                    onChange={field.onChange}
                    disciplines={disciplines}
                  />
                )}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Профессиональная информация
          </legend>

          <div className="fieldset-container">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Почта обязательна",
                maxLength: {
                  value: 254,
                  message: "Максимальное число символов 254",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Неверный формат почты",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Почта"
                  placeholder="example@mail.com"
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Логин обязателен",
                maxLength: {
                  value: 150,
                  message: "Максимально число символов 150",
                },
                pattern: {
                  value: /^[\w.@+-]+$/,
                  message:
                    "Можно использовать только буквы, цифры и спец. символы @/./+/-/_",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Логин"
                  placeholder="Логин"
                  error={errors.username?.message}
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
            text={teacherId ? "Обновить" : "Сохранить"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditTeacher);
