import React from 'react'
import Rating from '../../components/Rating'
import { Link } from 'react-router-dom'

function InstitutesItem({ id, name, rating }: {id:number, name: string, rating: number}) {
  return (
    <li>
      <Link to={`/institutes/${id}`} className="institutes__item">
        <p className="institutes__item_title">{name}</p>
        <Rating rating={rating} />
      </Link>
    </li>
  )
}

export default React.memo(InstitutesItem)