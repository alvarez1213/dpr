import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { API_URL_USERS } from '../../constants'
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col"

export const SignIn = () => {
  const [message, setMessage] = useState('')
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
  }  

  return (
    <div className="sign-in">
      <h1 className='sign-in__title'>Вход</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" as={Col} md="3" controlId='formSignInUsername'>
          <Form.Label>Ваш логин</Form.Label>
          <Form.Control
            placeholder='Введите логин'
            required
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйта введите логин.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" as={Col} md="3" controlId='formSignInPassword'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            placeholder='Введите пароль'
            required
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйта введите пароль.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Text>{message}</Form.Text>
        {message !== '' ? (
          <>
            <br />
            <Button variant="primary" type="submit" className='mt-3'>
              Войти
            </Button>
          </>
        ) : (
          <Button variant="primary" type="submit">
            Войти
          </Button>
        )}
      </Form>
    </div>
  )
}
