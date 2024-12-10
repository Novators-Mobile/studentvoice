import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../../components/Search";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// import GenerateIcon from "../../Icons/GenerateIcon";
import { getInstitutes, TInstitute } from "../../api/institutesApi";
import { institutesToOption } from "../../utils/adapter";
import { postTeacher, TTeacher } from "../../api/teacherApi";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";

// const departaments = [
//   "Школа бакалавриата",
//   "Кафедра вкусных булочек",
//   "Департамент ИТиА",
//   "Департамент ИИТ",
// ];

function EditTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  
  let title: string = "";
  // let isEdit: boolean = false;
  const normalizedPath = location.pathname.replace(/\/$/, "");
  if (normalizedPath.endsWith("edit")) {
    title = "Редактировать профиль";
    // isEdit = true;
  } else if (normalizedPath.endsWith("new-profile")) {
    title = "Новый профиль преподавателя";
  }

  const [institutes, setInstitutes] = useState<TInstitute[]>([]);
  const { handleSubmit, control, formState: { errors } } = useForm<TTeacher>({
    defaultValues: {
      second_name: "",
      first_name: "",
      patronymic: "",
      university: undefined,
      email: "",
      username: ""
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInstitutes();
        setInstitutes(result);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<TTeacher> = async (data) => {
    const loadingToast = AlertLoading("Отправка...");
    try {
      await postTeacher(data);
      AlertUpdate(loadingToast, "success", "Профиль создан успешно!");
      navigate(-1);
    } catch (err) {
      AlertUpdate(loadingToast, "error", "Ошибка при создании профиля");
      console.error("Ошибка при отправке данных: ", err);
    }
  };

  return (
    <>
      <h1 className="edit__title header-text">{title}</h1>

      <form className="edit-teacher__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Персональная информация
          </legend>

          <div className="fieldset-container">
            <Controller
              name="second_name"
              control={control}
              rules={{ required: "Фамилия обязательна" }}
              render={({ field }) => (
                <Input label="Фамилия" error={errors.second_name?.message} {...field} />
              )}
            />
            <Controller
              name="first_name"
              control={control}
              rules={{ required: "Имя обязательно" }}
              render={({ field }) => (
                <Input label="Имя" error={errors.first_name?.message} {...field} />
              )}
            />
            <Controller
              name="patronymic"
              control={control}
              rules={{ required: "Отчество обязательно" }}
              render={({ field }) => (
                <Input label="Отчество" error={errors.patronymic?.message} {...field} />
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
                rules={{ required: "Институт обязателен" }}
                render={({ field }) => (
                  <Select
                    label="Институт"
                    options={institutesToOption(institutes)}
                    placeholder="Выбор института..."
                    width="950px"
                    error={errors.university?.message}
                    {...field}
                  />
                )}
              />
              {/* <Select label="Кафедра" options={departaments} /> */}
            </div>

            <div className="fieldset-container">
              {/* <Search label="Дисциплины" /> */}
              <Search label="Лекции" />
              <Search label="Практики" />
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
              rules={{ required: "Почта обязательна" }}
              render={({ field }) => (
                <Input label="Почта" placeholder="example@mail.com" error={errors.email?.message} {...field} />
              )}
            />
            <Controller
              name="username"
              control={control}
              rules={{ required: "Логин обязателен" }}
              render={({ field }) => (
                <Input label="Логин" placeholder="Логин" error={errors.username?.message} {...field} />
              )}
            />

            {/* <div className="generate-password__wrap">
              <Input label="Пароль" type="password" placeholder="Пароль" />

              {!isEdit && (
                <Button text="Сгенерировать" icon={<GenerateIcon />} />
              )}
            </div> */}
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

export default React.memo(EditTeacher);
