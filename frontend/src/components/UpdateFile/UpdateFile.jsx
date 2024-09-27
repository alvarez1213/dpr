import { API_URL_STORAGE } from '../../constants'
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col"

export const UpdateFile = ({ file, handleClose, show }) => {
  const handleUpdate = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const newTitle = form[0].value
    const newComment = form[1].value

    file.title = newTitle
    file.comment = newComment
    delete file.file
    axios
      .put(API_URL_STORAGE + file.id, file, {
        'Content-Type': 'application/json'
      })
      .then(() => {
        handleClose()
      })
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Редактирование файла</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group as={Col} md="7" controlId='formUpdateFileTitle'>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type='text'
              defaultValue={file.title}
            />
          </Form.Group>
          <Form.Group className='mt-3' as={Col} md="7" controlId='formUpdateFileComment'>
            <Form.Label>Комментарий</Form.Label>
            <Form.Control
              type='text'
              as="textarea"
              rows={3}
              defaultValue={file.comment}
            />
          </Form.Group>

          <Button className='mt-4 me-3' type='submit'>Подтвердить</Button>
          <Button className='mt-4' variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}