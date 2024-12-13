import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
import { getInstitutes, TInstitute } from "../../api/admin/institutesApi";
import Skeleton from "../../components/Skeleton";

type InstItemProps = {
  id: number;
  name: string;
  rating: number;
};

function InstitutesItem({ id, name, rating }: InstItemProps) {
  return (
    <li className="institutes__item_wrap">
      <Link
        to={`/institutes/${id}`}
        className="institutes__item"
      >
        <p className="institutes__item_text medium-middle-text">{name}</p>
      </Link>

      <Rating rating={rating} type="medium" />
    </li>
  );
}

function Institutes() {
  const [institutes, setInstitutes] = useState<TInstitute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getInstitutes();
        setInstitutes(result);
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="institutes">
      <h1 className="institutes__title header-text">Институты</h1>
      <ul className="institutes__list">
        {error && <p>{error}</p>}

        {!institutes.length && "Список пуст"}
        
        {!error && institutes.map((item) => (
          <InstitutesItem
            key={item.id}
            id={item.id!}
            name={item.name}
            rating={0}
          />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Institutes);
