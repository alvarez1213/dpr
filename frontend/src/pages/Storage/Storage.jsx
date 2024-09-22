import { useState, useEffect, useContext } from 'react'
import { API_URL_STORAGE } from '../../constants'
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from "react-bootstrap/Col"

import { UserContext } from '../../components/UserContext';

import { StorageItem } from '../../components/StorageItem'
import { NoPermission } from '../../components/NoPermission';

export const Storage = () => {
  const [files, setFiles] = useState([])
  const { user } = useContext(UserContext);

  const getFiles = () => {
    if (!user) {
      return
    }
    axios
      .get(API_URL_STORAGE + `?pk=${user.id}`)
      .then((res) => {
        setFiles(res.data)
      })
  }
  useEffect(() => {
    getFiles()
    // eslint-disable-next-line
  }, [])

  if (!user) {
    return (
      <NoPermission />
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget
    const image = form[0].files[0]
    const comment = form[1].value

    let formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("title", image.name);
    formData.append("size", image.size);
    formData.append("comment", comment);
    formData.append("user", user.id);
    axios
      .post(API_URL_STORAGE, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        getFiles()
      })
      .catch((err) => console.log(err));
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
              <StorageItem key={file.id} file={file} getFiles={getFiles} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}
