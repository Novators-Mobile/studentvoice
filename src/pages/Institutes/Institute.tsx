import Dropdown from '../../components/Dropdown/Dropdown'
import Rating from '../../components/Rating'

const subjectsList = [
  {
    title: 'Основы проектной деятельности',
    rating: 8.3
  },
  {
    title: 'Программирование C# 1Ч.',
    rating: 7.5
  },
  {
    title: 'Управление требованиями',
    rating: 8.6
  },
  {
    title: 'Основы автоматического управления',
    rating: 6.7
  }
]

const teachersList = [
  {
    title: 'Новиков Максим Юрьевич ',
    rating: 8.3
  },
  {
    title: 'Шадрин Денис Борисович',
    rating: 7.5
  },
  {
    title: 'Мокрушин Андрей Анатольевич',
    rating: 8.6
  },
  {
    title: 'Белоусова Вероника Игоревна',
    rating: 6.7
  }
]

export default function Institute() {
  return (
    <div className='institute'>
      <div className="institute__title-block">
        <h1 className="institute__title title">Институт радиоэлектроники и информационных технологий-РТФ</h1>
        <Rating rating={8.3} />
      </div>

      <div className="institute__disciplines">
        <Dropdown type='discipline' title='Дисциплины' list={subjectsList} />
      </div>
      <div className="institute__teachers">
        <Dropdown type='teacher' title='Преподаватели' list={teachersList} />
      </div>
    </div>
  )
}
