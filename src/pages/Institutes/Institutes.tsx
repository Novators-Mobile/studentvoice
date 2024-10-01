import InstitutesItem from "./InstitutesItem"

const institutesList = [
  {
    name: 'Институт радиоэлектроники и информационных технологий - РТФ',
    rating: 8.3
  },
  {
    name: 'Физико-технологический институт',
    rating: 7.5
  },
  {
    name: 'Институт экономики и управления',
    rating: 8.6
  },
  {
    name: 'Институт строительства и архитектуры',
    rating: 6.7
  },
  {
    name: 'Уральский гуманитарный институт',
    rating: 7.9
  }
]

export default function Institutes() {
  return (
    <>
      <div className="institutes">
        <h1 className="institutes__title title">Институты</h1>
        <ul className="institutes__list">
          {institutesList.map((item, index) => (
            <InstitutesItem 
              key={index} 
              id={index}
              name={item.name} 
              rating={item.rating} 
            />
          ))}
        </ul>
      </div>
    </>
  )
}
