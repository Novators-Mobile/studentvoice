import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Search from "../../components/Search";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { getInstitutes, TInstitute } from "../../api/institutesApi";
import { postDiscipline, TDiscipline } from "../../api/disciplineApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { institutesToOption } from "../../utils/adapter";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";

const inputWidth = "912px";

function EditDiscipline() {
  const navigate = useNavigate();

  const location = useLocation();
  let title: string = "";
  const normalizedPath = location.pathname.replace(/\/$/, "");
  if (normalizedPath.endsWith("edit")) {
    title = "Редактировать дисциплину";
  } else if (normalizedPath.endsWith("new-discipline")) {
    title = "Новая дисциплина";
  }

  const [institutes, setInstitutes] = useState<TInstitute[]>([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TDiscipline>({
    defaultValues: {
      name: "",
      university: undefined,
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

  const onSubmit: SubmitHandler<TDiscipline> = async (data) => {
    const loadingToast = AlertLoading("Отправка...");
    try {
      await postDiscipline(data);
      AlertUpdate(loadingToast, "success", "Дисциплина создана успешно!");
      navigate(-1);
    } catch (err) {
      AlertUpdate(loadingToast, "error", "Ошибка при создании дисциплины");
      console.error("Ошибка при отправке данных: ", err);
    }
  };

  return (
    <>
      <h1 className="edit__title header-text">{title}</h1>

      <form className="edit-discipline__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="edit-discipline__fieldset">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Название обязательно" }}
            render={({ field }) => (
              <Input
                label="Название"
                width={inputWidth}
                error={errors.name?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="university"
            control={control}
            rules={{ required: "Институт обязателен" }}
            render={({ field }) => (
              <Select
                label="Интститут"
                options={institutesToOption(institutes)}
                width={inputWidth}
                error={errors.university?.message}
                {...field}
              />
            )}
          />
        </fieldset>

        <h2 className="edit-disipline__title medium-big-text">Преподаватели</h2>

        <fieldset className="edit-discipline__fieldset">
          <Search label="Лекции" width={inputWidth} />
          <Search label="Практики" width={inputWidth} />
        </fieldset>

        <div className="edit__form-btns">
          <Button text="Отменить" type="reset" onClick={() => navigate(-1)} />
          <Button text="Сохранить" type="submit" />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditDiscipline);
