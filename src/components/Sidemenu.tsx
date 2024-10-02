import logo from '../assets/images/icon-logo.svg'
import avatar from '../assets/images/avatar.svg'
import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Sidemenu() {
  const location = useLocation();

  return (
    <div className='wrapper'>
      <div className="menu">
        <div className="menu__title_wrap">
          <p className="menu__title">StudentVoice</p>
          <img src={logo} alt="Логотип" className="menu__logo" />
        </div>

        <div className="menu__user-info">
          <img src={avatar} alt="Фото профиля" className="menu__user-info_avatar" />
          <p className="menu__user-info_fio text-menu">Обабков Илья Николаевич</p>
        </div>

        <nav className="menu__nav">
          <ul className="menu__nav_list">
            <li className="menu__nav_list-item">
              <Link to="/login" className="menu__nav_link text-menu">
                <svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 14.9384C2 13.7142 2.56058 12.5574 3.52142 11.7989L14.7214 2.95677C16.1747 1.80948 18.2253 1.80948 19.6786 2.95677L30.8786 11.7989C31.8394 12.5574 32.4 13.7142 32.4 14.9384V29C32.4 31.2091 30.6091 33 28.4 33H23C22.4477 33 22 32.5523 22 32V25.4C22 24.2954 21.1046 23.4 20 23.4H14.4C13.2954 23.4 12.4 24.2954 12.4 25.4V32C12.4 32.5523 11.9523 33 11.4 33H6C3.79086 33 2 31.2091 2 29L2 14.9384Z" stroke="currentColor" strokeWidth="3"/>
                </svg>
                Главная страница
              </Link>
            </li>
            <li className={`menu__nav_list-item ${location.pathname === '/institutes' ? 'active' : ''}`}>
              <Link 
                to="/institutes" className="menu__nav_link text-menu">
                <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.1298 0.5C14.6932 0.5 16.1826 1.08015 17.3252 2.1H25.2C29.8374 2.1 33.6273 5.72825 33.8859 10.3009C34.9051 11.8146 35.5 13.6378 35.5 15.6V22.8C35.5 28.0467 31.2467 32.3 26 32.3H10C4.75329 32.3 0.5 28.0467 0.5 22.8V10C0.5 4.75329 4.75329 0.5 10 0.5H13.1298ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5H13.1298C14.1956 3.5 15.1957 4.01469 15.8152 4.88191L16.9436 6.4618C18.1262 8.11742 20.0356 9.1 22.0702 9.1H26C29.5899 9.1 32.5 12.0101 32.5 15.6V22.0998H25.5821C24.7537 22.0998 24.0821 22.7714 24.0821 23.5998C24.0821 24.4282 24.7537 25.0998 25.5821 25.0998H32.0814C31.1526 27.5546 28.7801 29.3 26 29.3H10C6.41015 29.3 3.5 26.3898 3.5 22.8V10ZM22.0702 6.1C21.1718 6.1 20.3201 5.73429 19.7037 5.1H25.2C26.6871 5.1 28.0412 5.66948 29.0561 6.60225C28.097 6.27661 27.0691 6.1 26 6.1H22.0702Z" fill="currentColor"/>
                </svg>
                Общая база
              </Link>
            </li>
            <li className="menu__nav_list-item">
              <Link to="/" className="menu__nav_link text-menu">
                <svg width="37" height="39" viewBox="0 0 37 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 16.7C3 9.1337 9.1337 3 16.7 3C24.2663 3 30.4 9.1337 30.4 16.7C30.4 24.2663 24.2663 30.4 16.7 30.4C9.1337 30.4 3 24.2663 3 16.7ZM16.7 0C7.47684 0 0 7.47684 0 16.7C0 25.9232 7.47684 33.4 16.7 33.4C20.3619 33.4 23.7486 32.2214 26.5013 30.2227L34.0393 37.7608C34.6251 38.3466 35.5748 38.3466 36.1606 37.7609C36.7464 37.1751 36.7464 36.2253 36.1606 35.6395L28.7664 28.2452C31.6367 25.2462 33.4 21.179 33.4 16.7C33.4 7.47684 25.9232 0 16.7 0Z" fill="currentColor"/>
                </svg>
                Поиск
              </Link>
            </li>
            <li className="menu__nav_list-item">
              <Link to="/" className="menu__nav_link text-menu">
                <svg width="37" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.7963 1.22665C19.1621 -0.141226 21.3773 -0.142059 22.7441 1.22477L28.418 6.89861C29.7731 8.25378 29.7872 10.4477 28.4495 11.8201L12.3194 28.3698C11.4727 29.2384 10.3115 29.7282 9.09902 29.7282L2.99879 29.7279C1.29313 29.7279 -0.0690268 28.306 0.00270896 26.6006L0.260698 20.4671C0.308095 19.3403 0.776431 18.2723 1.57303 17.4745L17.7963 1.22665ZM20.6244 3.3477C20.4292 3.15244 20.1127 3.15256 19.9176 3.34797L17.4681 5.80113L24.1653 11.9177L26.3028 9.72461C26.4939 9.52854 26.4918 9.21513 26.2983 9.02153L20.6244 3.3477ZM3.69435 19.5958L14.639 8.6345L21.3719 14.7837L10.1726 26.2743C9.89039 26.5638 9.50332 26.7271 9.09915 26.7271L2.99892 26.7268L3.25691 20.5933C3.27271 20.2177 3.42882 19.8617 3.69435 19.5958ZM32.4183 29.6118C33.2464 29.6118 33.9177 28.94 33.9177 28.1113C33.9177 27.2825 33.2464 26.6107 32.4183 26.6107H21.349C20.5209 26.6107 19.8496 27.2825 19.8496 28.1113C19.8496 28.94 20.5209 29.6118 21.349 29.6118H32.4183Z" fill="currentColor"/>
                </svg>
                Создать новый профиль
              </Link>
            </li>
            <li className="menu__nav_list-item">
              <Link to="/" className="menu__nav_link text-menu">
                <svg width="37" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M29.2605 2.76544C27.717 1.22841 25.2155 1.22935 23.6732 2.76755L11.7445 14.6666C10.7904 15.6182 10.2295 16.8919 10.1727 18.2359L10.0029 22.2562C9.9256 24.0868 11.3939 25.613 13.2324 25.6131L17.1878 25.6133C18.64 25.6133 20.0307 25.0292 21.0447 23.9931L32.8774 11.8661C34.388 10.3228 34.3721 7.85572 32.8418 6.3318L29.2605 2.76544ZM25.1976 4.28557C25.8986 3.58639 27.0357 3.58596 27.7372 4.28461L31.3185 7.85097C32.0141 8.54366 32.0214 9.66505 31.3347 10.3666L28.9583 12.7947L22.8074 6.66941L25.1976 4.28557ZM21.2841 8.18858L13.2689 16.1847C12.6964 16.7556 12.3599 17.5198 12.3258 18.3262L12.156 22.3465C12.1302 22.9567 12.6197 23.4655 13.2325 23.4655L17.1879 23.4657C18.0592 23.4657 18.8937 23.1152 19.502 22.4936L27.4535 14.3322L21.2841 8.18858Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M30.8 19.2135V28.6135C30.8 31.3749 28.5614 33.6135 25.8 33.6135H7C4.23858 33.6135 2 31.3749 2 28.6135V9.81348C2 7.05205 4.23858 4.81348 7 4.81348H16.4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Создать новую дисциплину
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
