import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../components/Rating";
import { getInstitutes, TInstitute } from "../../api/institutesApi";

type InstItemProps = {
  id: number;
  name: string;
  rating: number;
};

function InstitutesItem({ id, name, rating }: InstItemProps) {
  const navigate = useNavigate();

  return (
    <li className="institutes__item_wrap">
      <div
        className="institutes__item"
        onClick={() => navigate(`/institutes/${id}`)}
      >
        <p className="institutes__item_text medium-middle-text">{name}</p>
      </div>

      <Rating rating={rating} type="medium" />
    </li>
  );
}

function Institutes() {
  const [institutes, setInstitutes] = useState<TInstitute[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInstitutes();
        setInstitutes(result);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="institutes">
      <h1 className="institutes__title header-text">Институты</h1>
      <ul className="institutes__list">
        {institutes.map((item) => (
          <InstitutesItem
            key={item.id}
            id={item.id!}
            name={item.name}
            rating={2}
          />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Institutes);
