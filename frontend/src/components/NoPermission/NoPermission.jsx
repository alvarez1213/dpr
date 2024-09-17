import { Link as RouterNavLink } from 'react-router-dom';
import Button from "react-bootstrap/Button"

export const NoPermission = () => {
  return (
    <div className="error-message">
      <h1>401 - Нет доступа</h1>
      <h3>Упс, кажется вы ещё не зарегестрировались на сайте!</h3>
      <RouterNavLink to='/'>
        <Button className="mt-3 me-3" variant="secondary">
          На главную
        </Button>
      </RouterNavLink>
      <RouterNavLink to='/signup'>
        <Button className="mt-3" variant="secondary">
          Регистрация
        </Button>
      </RouterNavLink>
    </div>
  )
}
