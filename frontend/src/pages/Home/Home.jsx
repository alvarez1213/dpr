import React, { Component } from 'react'
import { Link as RouterNavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button'

export class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1 className='home__title mb-4'>My Cloud - облачное хранилище</h1>
        <p className='home__info'>Чтобы продолжить создайте аккаунт или войдите в существующий.</p>
        <RouterNavLink to='/signin'>
          <Button variant='outline-secondary'>Войти</Button>
        </RouterNavLink>
        <RouterNavLink to='/signup'>
          <Button className='ms-4' variant='secondary'>Зарегистрироваться</Button>
        </RouterNavLink>
      </div>
    )
  }
}
