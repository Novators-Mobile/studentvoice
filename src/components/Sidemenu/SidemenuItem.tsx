import React from 'react';
import { Link } from 'react-router-dom';

function SidemenuItem() {
  return (
    <li className={`menu__nav_list-item ${location.pathname.startsWith('/institutes') ? 'active' : ''}`}>
      <Link 
        to="/institutes" className="menu__nav_link text-menu">
        <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.1298 0.5C14.6932 0.5 16.1826 1.08015 17.3252 2.1H25.2C29.8374 2.1 33.6273 5.72825 33.8859 10.3009C34.9051 11.8146 35.5 13.6378 35.5 15.6V22.8C35.5 28.0467 31.2467 32.3 26 32.3H10C4.75329 32.3 0.5 28.0467 0.5 22.8V10C0.5 4.75329 4.75329 0.5 10 0.5H13.1298ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5H13.1298C14.1956 3.5 15.1957 4.01469 15.8152 4.88191L16.9436 6.4618C18.1262 8.11742 20.0356 9.1 22.0702 9.1H26C29.5899 9.1 32.5 12.0101 32.5 15.6V22.0998H25.5821C24.7537 22.0998 24.0821 22.7714 24.0821 23.5998C24.0821 24.4282 24.7537 25.0998 25.5821 25.0998H32.0814C31.1526 27.5546 28.7801 29.3 26 29.3H10C6.41015 29.3 3.5 26.3898 3.5 22.8V10ZM22.0702 6.1C21.1718 6.1 20.3201 5.73429 19.7037 5.1H25.2C26.6871 5.1 28.0412 5.66948 29.0561 6.60225C28.097 6.27661 27.0691 6.1 26 6.1H22.0702Z" fill="currentColor"/>
        </svg>
        Общая база
      </Link>
    </li>
  );
}

export default React.memo(SidemenuItem);