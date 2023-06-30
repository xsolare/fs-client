import type { AuthDialogStore } from '../auth.store'
import type { FC } from 'react'

interface IProps {
  store: AuthDialogStore
}

// SignIn
//* ------------------------------------------------------------------------------------------ *//
const SignUp: FC<IProps> = observer((props) => {
  const { store } = props
  const { state, setLogin, setPassword, signUp: submit } = store

  return (
    <form onClick={(e) => e.preventDefault()} className="dialog-content">
      <input
        max={32}
        value={state.login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Имя пользователя"
        type="login"
      />
      <input
        max={32}
        value={state.password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        type="password"
      />
      <button type="submit" onClick={submit}>
        Зарегистрироваться
      </button>
    </form>
  )
})

export { SignUp }
