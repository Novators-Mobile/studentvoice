import React from 'react';
import TitleBlock from '../../components/TitleBlock';
import List from '../../components/List/List';

const subjectsList = [
  {
    title: 'Основы проектной деятельности',
    rating: 8.3,
    lecture: true,
    practive: true
  },
  {
    title: 'Программирование C# 1Ч.',
    rating: 7.5,
    lecture: false,
    practive: true
  },
  {
    title: 'Управление требованиями',
    rating: 8.6,
    lecture: false,
    practive: true
  }
]

const lessonsList = [
  {
    title: 'Основы проектной деятельности (17.09.24)',
    rating: 8.3,
    type: 'lecture'
  },
  {
    title: 'Основы проектной деятельности (17.09.24)',
    rating: 8.3,
    type: 'practice'
  },
  {
    title: 'Основы проектной деятельности (17.09.24)',
    rating: 8.3,
    type: 'practice'
  },
  {
    title: 'Основы проектной деятельности (17.09.24)',
    rating: 8.3,
    type: 'practice'
  },
]

function ItemInfo() {
  return (
    <div className='item-info'>
      <TitleBlock title='Новиков Максим Юрьевич' rating={8.4} />

      <List type='discipline' title='Дисциплины' list={subjectsList} />
      
      <List type='lesson' title='Пары' list={lessonsList} />
    </div>
  );
}

export default React.memo(ItemInfo);