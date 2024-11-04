import React from 'react';
import logo from '../assets/images/icon-logo.svg';
import userLogo from '../assets/images/user-logo.svg';
import { Outlet, Link, useLocation } from 'react-router-dom';
import InstitutesMenuIcon from './Icons/InstitutesMenuIcon';
import SearchMenuIcon from './Icons/SearchMenuIcon';
import NewProfileMenuIcon from './Icons/NewProfileMenuIcon';
import NewDisciplineMenuIcon from './Icons/NewDisciplineMenuIcon';

function Sidemenu() {
  const location = useLocation();

  return (
    <div className='wrapper'>
      <div className="menu">
        <div className="menu__title_wrap">
          <p className="logo-text">StudentVoice</p>
          <img src={logo} alt="Логотип" className="menu__logo" />
        </div>

        <div className="menu__user-info">
          <img src={userLogo} alt="Изображение профиля" />
          <p className="menu__user-info_fio semi-bold-text">
            Обабков Илья Николаевич
          </p>
        </div>

        <nav className="menu__nav">
          <ul className="menu__nav_list">
            <li className={`menu__nav_list-item ${location.pathname.startsWith('/institutes') || location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/institutes" className="menu__nav_link semi-bold-text">
                <InstitutesMenuIcon /> Общая база
              </Link>
            </li>
            <li className={`menu__nav_list-item ${location.pathname.startsWith('/search') ? 'active' : ''}`}>
              <Link to="/search" className="menu__nav_link semi-bold-text">
                <SearchMenuIcon /> Поиск
              </Link>
            </li>
            <li className={`menu__nav_list-item ${location.pathname.startsWith('/new-profile') ? 'active' : ''}`}>
              <Link to="/new-profile" className="menu__nav_link semi-bold-text">
                <NewProfileMenuIcon /> Создать новый профиль
              </Link>
            </li>
            <li className={`menu__nav_list-item ${location.pathname.startsWith('/new-discipline') ? 'active' : ''}`}>
              <Link to="/new-discipline" className="menu__nav_link semi-bold-text">
                <NewDisciplineMenuIcon /> Создать новую дисциплину
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="outlet-container">
        <Outlet/>
      </div>
    </div>
  )
}

export default React.memo(Sidemenu)