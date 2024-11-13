import React from "react";
import LoginInput from "../components/LoginInput";
import LoginButton from "../components/LoginButton";

function Login() {
  return (
    <div className="login__container">
      <div className="login">
        <div className="login__wrap">
          <div className="login__greeting-card">
            <h1 className="header-text">
              Добро пожаловать в&nbsp;StudentVoice!
            </h1>
            <p className="logo-text">Здесь тебя услышат</p>
          </div>

          <form action="" className="login__auth-form">
            <div className="login__inputs_wrap">
              <LoginInput placeholder="Логин" />
              <LoginInput placeholder="Пароль" type="password" />
            </div>

            <LoginButton text="Войти" type="submit" margin="0 0 24px 0" />

            <p className="login__hint-text regular-text">
              В случае потери пароля обращаться к администратору по адресу
              <a href="mailto:example@mail.com"> example@mail.com</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login);
