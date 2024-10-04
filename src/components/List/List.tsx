import React from 'react'
import ListItem from './ListItem'
import Tools from '../Tools'

type TListItem = {
  title: string,
  rating: number
}

type Props = {
  type: string, 
  title: string, 
  list: TListItem[]
}

function List({ type, title, list }: Props) {

  return (
    <>
      <div className="list__wrapper">
        <div className="list">
          <p className="list__title">{title}</p>
        </div>

        <Tools />
      </div>

      <div className="list__items">
        <p className="list__subtitle">Лекции</p>
        <ul className="list__lectures">
          {list.map((item, index) => (
            <ListItem 
              key={index} 
              id={index} 
              type={type} 
              title={item.title} 
              rating={item.rating} />
          ))}
        </ul>
        
        <p className="list__subtitle">Практики</p>
        <ul className="list__practices">
          {list.map((item, index) => (
            <ListItem 
              key={index} 
              id={index} 
              type={type} 
              title={item.title} 
              rating={item.rating} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default React.memo(List)