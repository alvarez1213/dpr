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

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget

    let isValid = true
    if (form.checkValidity() === false) {
      isValid = false
    }

    setValidated(true);

    if (isValid) {
      const username = form[0].value
      const password = form[1].value

      const data = {
        username: username,
        password: password,
        create: false
      }
      axios
        .post(API_URL_USERS, data, {
          'Content-Type': 'application/json'
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data
            navigate('/storage', { state: user })
          }
        })
        .catch(err => {
          const data = err.response.data

          setMessage(data.message)
          form[0].value = ''
          form[1].value = ''
        })
    }
  }

  return (
    <div className="sign-in">
      <h1 className='sign-in__title'>Вход</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" as={Col} md="3" controlId='formSignInUsername'>
          <Form.Label>Ваш логин</Form.Label>
          <Form.Control
            type='text'
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
            type='password'
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
