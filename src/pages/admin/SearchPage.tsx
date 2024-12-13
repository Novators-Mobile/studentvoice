import React, { useState } from "react";
import Search from "../../components/Search";
import { search, TSearch } from "../../api/admin/searchApi";
import { Link } from "react-router-dom";

type TSearchItemProps = {
  id: number;
  text: string;
  link: string;
};

function SearchPageItem({ id, text, link }: TSearchItemProps) {
  return (
    <Link to={link}>
      <li key={id} className="search__item medium-middle-text">
        {text}
      </li>
    </Link>
  );
}

function SearchPage() {
  const [list, setList] = useState<TSearch>({
    subjects: [],
    teachers: [],
    universities: [],
  });

  const handleSearch = async (searchText: string) => {
    try {
      const listData = await search(searchText);
      setList(listData);
    } catch (err) {
      setList({
        subjects: [],
        teachers: [],
        universities: [],
      });
      console.error("Ошибка при получении данных: ", err);
    }
  };

  return (
    <>
      <div className="search-title header-text">
        Поиск сотрудников и&nbsp;дисциплин
      </div>

      <Search isBig={true} onSearch={handleSearch} />

      <ul className="search__items-list">
        {list?.subjects.map((item) => (
          <SearchPageItem
            id={item.id}
            text={item.name}
            link={`/institutes/${item.university_id}/discipline/${item.id}/`}
          />
        ))}

        {list?.teachers.map((item) => (
          <SearchPageItem
            id={item.id}
            text={`${item.second_name} ${item.first_name} ${item.patronymic}`}
            link={`/institutes/${item.university_id}/teacher/${item.id}/`}
          />
        ))}

        {list?.universities.map((item) => (
          <SearchPageItem
            id={item.id}
            text={item.name}
            link={`/institutes/${item.id}/`}
          />
        ))}
      </ul>
    </>
  );
}

export default React.memo(SearchPage);
