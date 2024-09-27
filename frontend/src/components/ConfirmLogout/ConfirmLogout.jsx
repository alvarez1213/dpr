import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ConfirmLogout = ({ show, handleClose }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    handleClose()

    navigate('/')
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Выход</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите выйти из аккаунта?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleLogout}>
          Выйти
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
