import React, { useState } from "react";
import Search from "../../components/Search";
import { search, TSearch } from "../../api/searchApi";

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
        {list?.subjects.map((item, index) => (
          <li key={index} className="search__item medium-middle-text">
            {item.name}
          </li>
        ))}

        {list?.teachers.map((item, index) => (
          <li key={index} className="search__item medium-middle-text">
            {`${item.second_name} ${item.first_name} ${item.patronymic}`}
          </li>
        ))}

        {list?.universities.map((item, index) => (
          <li key={index} className="search__item medium-middle-text">
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default React.memo(SearchPage);
