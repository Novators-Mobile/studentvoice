import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Search from "../../components/Search";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { getInstitutes, TInstitute } from "../../api/admin/institutesApi";
import {
  getDiscipline,
  postDiscipline,
  putDiscipline,
  TDiscipline,
} from "../../api/admin/disciplineApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { institutesToOption } from "../../utils/adapter";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";
import Skeleton from "../../components/Skeleton";

const inputWidth = "912px";

function EditDiscipline() {
  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [institutes, setInstitutes] = useState<TInstitute[]>([]);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TDiscipline>({
    defaultValues: {
      name: "",
      university: undefined,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const institutesData = await getInstitutes();
        setInstitutes(institutesData);

        if (disciplineId) {
          const disciplineData = await getDiscipline(disciplineId);
          reset({
            name: disciplineData.name,
            university: disciplineData.university,
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
  }, [disciplineId, reset]);

  const onSubmit: SubmitHandler<TDiscipline> = async (data) => {
    const loadingToast = AlertLoading("Отправка...");
    try {
      if (disciplineId) {
        await putDiscipline(disciplineId, data);
        AlertUpdate(loadingToast, "success", "Дисциплина обновлена успешно!");
      } else {
        await postDiscipline(data);
        AlertUpdate(loadingToast, "success", "Дисциплина создана успешно!");
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
        {disciplineId
          ? "Редактировать дисциплину"
          : "Новая дисциплина"}
      </h1>

      <form className="edit-discipline__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="edit-discipline__fieldset">
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
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <Select
                label="Интститут"
                options={institutesToOption(institutes)}
                width={inputWidth}
                error={errors.university?.message}
                value={field.value}
                onChange={(id) => field.onChange(id)}
              />
            )}
          />
        </fieldset>

        <h2 className="edit-disipline__title medium-big-text">Преподаватели</h2>

        <fieldset className="edit-discipline__fieldset small">
          <Search label="Лекции" width={inputWidth} />
          <Search label="Практики" width={inputWidth} />
        </fieldset>

        <div className="edit__form-btns">
          <Button
            text="Отменить"
            type="reset"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          />
          <Button
            text={disciplineId ? "Обновить" : "Сохранить"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditDiscipline);
