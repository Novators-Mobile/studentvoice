import dayjs from "dayjs";
import { TDiscipline } from "../api/admin/disciplineApi";
import { TInstitute } from "../api/admin/institutesApi";
import { TLesson } from "../api/admin/lessonApi";
import { TTeacher } from "../api/admin/teacherApi";
import { DropdownListItem } from "../components/Dropdown/Dropdown";
import { TListItem } from "../components/List/List";
import { TSelectOption } from "../components/Select";
import { TStatsWeekItem } from "../api/admin/statsApi";
import { TGraphItem } from "../components/StatisticsGraph";

export const disciplineToListItem = (data: TDiscipline[]): DropdownListItem[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      title: item.name,
      rating: item.rating!,
    };
  });
};

export const teachersToListItem = (data: TTeacher[]): DropdownListItem[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      title: `${item.second_name} ${item.first_name} ${item.patronymic}`,
      rating: item.rating!,
    };
  });
};

export const lessonsToListItem = (data: TLesson[]): TListItem[] => {
  return data.map((item) => {
    return {
      id: item.id!,
      title: `${item.name} (${dayjs(item.date).format("DD.MM.YYYY")})`,
      rating: item.rating!,
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

export const statsWeekToGraph = (data: TStatsWeekItem[]): TGraphItem[] => {
  return data.map((item) => {
    return {
      name: String(item.week_number),
      rating: item.rating || 0
    };
  });
};