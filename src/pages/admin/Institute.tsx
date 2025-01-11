import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import TitleBlock from "../../components/TitleBlock";
import { useNavigate, useParams } from "react-router-dom";
import StatisticsGraph from "../../components/StatisticsGraph";
import { getInstitute, TInstitute } from "../../api/admin/institutesApi";
import { deleteDiscipline, getDisciplines, TDiscipline } from "../../api/admin/disciplineApi";
import { disciplineToListItem, teachersToListItem } from "../../utils/adapter";
import { deleteTeacher, getTeachers, TTeacher } from "../../api/admin/teacherApi";
import { sortByYearAndMonth, sortDisciplines, sortTeachers } from "../../utils/sort";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";
import Skeleton from "../../components/Skeleton";
import { getDisciplinesFromInstitute, getTeachersFromInstitute } from "../../api/excel/excelApi";
import { getStatsByMonth, TStatsItem } from "../../api/admin/statsApi";

function Institute() {
  const navigate = useNavigate();
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState<TInstitute>();
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [teachers, setTeachers] = useState<TTeacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isReverseDisciplines, setIsReverseDisciplines] = useState<boolean>(false);
  const [isReverseTeachers, setIsReverseTeachers] = useState<boolean>(false);
  const [stats, setStats] = useState<TStatsItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const instituteData = await getInstitute(instituteId!);
        const disciplinesData = await getDisciplines({
          universityId: instituteId,
        });
        const teachersData = await getTeachers({ universityId: instituteId });

        setInstitute(instituteData);
        setDisciplines(sortDisciplines(disciplinesData, isReverseDisciplines));
        setTeachers(sortTeachers(teachersData, isReverseTeachers));
        
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStatsByMonth(instituteId!);
        const sortedData = sortByYearAndMonth(statsData);
        setStats(sortedData);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, [instituteId]);

  const toggleSortDisciplines = () => {
    setDisciplines(sortDisciplines(disciplines, !isReverseDisciplines));
    setIsReverseDisciplines((prev) => !prev);
  };

  const toggleSortTeachers = () => {
    setTeachers(sortTeachers(teachers, !isReverseTeachers));
    setIsReverseTeachers((prev) => !prev);
  };

  const handleSearchDiscipline = async (searchText: string) => {
    try {
      const disciplinesData = await getDisciplines({
        universityId: instituteId,
        search: searchText,
      });
      setDisciplines(sortDisciplines(disciplinesData, isReverseDisciplines));
    } catch (err) {
      console.error("Ошибка при получении данных: ", err);
    }
  };

  const handleSearchTeacher = async (searchText: string) => {
    try {
      const teachersData = await getTeachers({
        universityId: instituteId,
        search: searchText,
      });
      setTeachers(sortTeachers(teachersData, isReverseTeachers));
    } catch (err) {
      console.error("Ошибка при получении данных: ", err);
    }
  };

  const handleDeleteDiscipline = async (id: string) => {
    const loadingToast = AlertLoading("Удаление...");
    try {
      await deleteDiscipline(id);
      setDisciplines(prev => prev.filter(item => String(item.id!) !== id));
      AlertUpdate(loadingToast, "success", "Успешно удалено!");
    } catch (error) {
      AlertUpdate(loadingToast, "error", "Ошибка при удалении");
      console.error("Ошибка при удалении: ", error)
    }
  }

  const handleDeleteTeacher = async (id: string) => {
    const loadingToast = AlertLoading("Удаление...");
    try {
      await deleteTeacher(id);
      setTeachers(prev => prev.filter(item => String(item.id!) !== id));
      AlertUpdate(loadingToast, "success", "Успешно удалено!");
    } catch (error) {
      AlertUpdate(loadingToast, "error", "Ошибка при удалении");
      console.error("Ошибка при удалении: ", error)
    }
  }

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="institute">
      <TitleBlock
        title={institute?.short_name}
        decryption={institute?.name}
        rating={institute?.rating || 0}
        editBtn={false}
      />

      <Dropdown
        type="discipline"
        title="Дисциплины"
        list={disciplineToListItem(disciplines)}
        onPlusClick={() => navigate("/new-discipline")}
        onSearch={handleSearchDiscipline}
        onSortClick={toggleSortDisciplines}
        isSortReversed={isReverseDisciplines}
        onDelete={handleDeleteDiscipline}
        disableExcelBtn={!disciplines.length}
        onExcelClick={() => getDisciplinesFromInstitute(instituteId!)}
        listRating={institute?.subjects_rating || 0}
      />

      <Dropdown
        type="teacher"
        title="Преподаватели"
        list={teachersToListItem(teachers)}
        onPlusClick={() => navigate("/new-profile")}
        onSearch={handleSearchTeacher}
        onSortClick={toggleSortTeachers}
        isSortReversed={isReverseTeachers}
        onDelete={handleDeleteTeacher}
        disableExcelBtn={!teachers.length}
        onExcelClick={() => getTeachersFromInstitute(instituteId!)}
        listRating={institute?.teachers_rating || 0}
      />

      <div className="institute__stats_wrap">
        <StatisticsGraph data={stats!} width={1100} />
      </div>
    </div>
  );
}

export default React.memo(Institute);
