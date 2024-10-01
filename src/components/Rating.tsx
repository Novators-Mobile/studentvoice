export default function InstitutesItem({ rating }: {rating: number}) {
  let color: string = '#38C321';

  if (rating >= 8) {
    color = '#38C321';
  } else if (rating >= 6) {
    color = '#E8D31C';
  } else {
    color = '#FF7171';
  }

  const ratingStyle = { backgroundColor: color };

  return (
    <p className="institutes__item_rating" style={ ratingStyle }>{rating}</p>
  )
}
