import { Link } from "react-router-dom"
import Rating from "../Rating"

export default function DropdownItem({ title, rating }: {title: string, rating: number}) {
  return (
    <li className="dropdown__item">
      <Link to="/" className="dropdown__item_link">{title}</Link>
      <Rating rating={rating} />
    </li>
  )
}
