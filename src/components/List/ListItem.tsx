  import { Link, useLocation } from "react-router-dom"
  import Rating from "../Rating"
  import React, { useMemo } from "react";

  type Props = {
    id: number;
    title: string;
    rating: number;
    type: string;
  }

  function ListItem({ id, title, rating, type }: Props) {
    const location = useLocation();
    
    const linkPath = useMemo(() => {
      const pathSegments = location.pathname.split("/");
      const basePath = pathSegments.slice(0, 3).join("/");
      
      return `${basePath}/${type}/${id}`;
    }, [location.pathname, type, id]);

    return (
      <li className="list__item">
        <Link to={linkPath} className="list__item_link">{title}</Link>

        <Rating rating={rating} />  
      </li>
    )
  }

  export default React.memo(ListItem)