import { Link as RouterNavLink } from 'react-router-dom';
import Button from "react-bootstrap/Button"

export const PageNotFound = () => {
  return (
    <div className="error-message">
      <h1>404 - Не найдено</h1>
      <h3>Упс, такая страница не найдена!</h3>
      <RouterNavLink to='/'>
        <Button className="mt-3 me-3" variant="secondary">
          На главную
        </Button>
      </RouterNavLink>
      <RouterNavLink to='/storage'>
        <Button className="mt-3" variant="secondary">
          В Хранилище
        </Button>
      </RouterNavLink>
    </div>
  )
}
