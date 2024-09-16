import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { API_URL_STORAGE } from '../../constants'
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from "react-bootstrap/Col"

import { StorageItem } from '../../components/StorageItem'

export const Storage = () => {
  const [files, setFiles] = useState([])
  const location = useLocation()
  const user = location.state

  const handleSubmit = (e) => {
    e.preventDefault();
  }
    
  return (
    <div className="storage">
      <h1 className="storage__title">Ваше Хранилище</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" className="" controlId="formStorageFile">
          <Form.Label>Добавить новый файл</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className='mt-3' as={Col} md="4" controlId='formStorageComment'>
          <Form.Label>Комментарий (опциональный)</Form.Label>
          <Form.Control
            type='text'
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button type='submit' className='mt-3 mb-4'>Добавить</Button>
      </Form>

      {!files || files.length <= 0 ? (
        <p>Упс, вы ещё не загрузили ни одного файла.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Размер</th>
              <th>Дата загрузки</th>
              <th>Дата последнего скачивания</th>
              <th>Комментарий</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <StorageItem key={file.id} file={file} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}
