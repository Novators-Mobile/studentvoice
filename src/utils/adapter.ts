import dayjs from "dayjs";
import { TDiscipline } from "../api/disciplineApi";
import { TInstitute } from "../api/institutesApi";
import { TLesson } from "../api/lessonApi";
import { TTeacher } from "../api/teacherApi";
import { DropdownListItem } from "../components/Dropdown/Dropdown";
import { TListItem } from "../components/List/List";
import { TSelectOption } from "../components/Select";

export const disciplineToListItem = (data: TDiscipline[]): DropdownListItem[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      title: item.name,
      rating: 2,
    };
  });
};

export const teachersToListItem = (data: TTeacher[]): DropdownListItem[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      title: `${item.second_name} ${item.first_name} ${item.patronymic}`,
      rating: 2,
    };
  });
};

export const lessonsToListItem = (data: TLesson[]): TListItem[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      title: dayjs(item.date).format("DD.MM.YYYY HH:mm"),
      rating: 2,
    };
  });
};

// TODO: исправить, когда поменяется TInstitute
export const institutesToOption = (data: TInstitute[]): TSelectOption[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      name: item.name
    };
  });
};

export const disciplinesToOption = (data: TDiscipline[]): TSelectOption[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      name: item.name
    };
  });
};

export const teachersToOption = (data: TTeacher[]): TSelectOption[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      name: `${item.second_name} ${item.first_name} ${item.patronymic}`
    };
  });
};