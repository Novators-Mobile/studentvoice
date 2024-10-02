export default function Login() {
  return (
    <div className="login__container">
      <div className="login">
        <div className="login__wrap">
          <div className="login__greeting-card">
            <h1 className="login__title title">Добро пожаловать в&nbsp;StudentVoice!</h1>
            <p className="login__text">Здесь тебя услышат</p>
          </div>

          <form action="" className="login__auth-form">
            <input type="text" className="login__auth-form_field" placeholder="Логин" required />
            <input type="password" className="login__auth-form_field" placeholder="Пароль" required />

            <button type="submit" className="login__submit-btn">Войти</button>
          </form>
        </div>
      </div>
    </div>
  )
}
