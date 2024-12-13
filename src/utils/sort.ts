import { TDiscipline } from "../api/admin/disciplineApi";
import { TTeacher } from "../api/admin/teacherApi";

export const sortDisciplines = (disciplines: TDiscipline[], isReverse: boolean = false ): TDiscipline[] => {
  return [...disciplines].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) return isReverse ? 1 : -1;
    if (nameA > nameB) return isReverse ? -1 : 1;
    return 0;
  });
};

export const sortTeachers = (teachers: TTeacher[], isReverse: boolean = false): TTeacher[] => {
  return [...teachers].sort((a, b) => {
    const fullNameA = `${a.second_name} ${a.first_name} ${a.patronymic}`.toLowerCase();
    const fullNameB = `${b.second_name} ${b.first_name} ${b.patronymic}`.toLowerCase();

    if (fullNameA < fullNameB) return isReverse ? 1 : -1;
    if (fullNameA > fullNameB) return isReverse ? -1 : 1;
    return 0;
  });
};