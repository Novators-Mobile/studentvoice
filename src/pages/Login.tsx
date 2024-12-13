import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";
import { login, LoginRequest } from "../api/admin/authApi";
import { useNavigate } from "react-router-dom";
import { AlertUpdate, AlertLoading } from "../utils/Notifications";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (token && role) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    const loadingToast = AlertLoading();
    try {
      await login(data);

      AlertUpdate(loadingToast, "success", "Успешный вход!");

      navigate("/institutes", { replace: true });
    } catch (err) {

      AlertUpdate(loadingToast, "error", "Ошибка входа. Проверьте логин или пароль.");

      console.error("Ошибка входа:", err);
    }
  };

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

          <form className="login__auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__inputs_wrap">
              <LoginInput
                placeholder="Логин"
                error={errors.username && errors.username.message}
                {...register("username", { required: "Введите логин" })}
              />

              <LoginInput
                placeholder="Пароль"
                type="password"
                error={errors.password && errors.password.message}
                {...register("password", { required: "Введите пароль" })}
              />
            </div>

            <LoginButton
              text="Войти"
              type="submit"
              margin="0 0 24px 0"
              disabled={isSubmitting}
            />

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
