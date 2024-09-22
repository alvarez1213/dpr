import axios from 'axios';
import { API_URL_STORAGE } from '../../constants'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ConfirmFileDelete = ({ id, show, handleClose, getFiles  }) => {
  const handleDelete = () => {
    axios
      .delete(API_URL_STORAGE + id)
      .then(() => {
        handleClose()
        getFiles()
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
        <Modal.Title>Удаление файла</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить этот файл?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>Удалить</Button>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
