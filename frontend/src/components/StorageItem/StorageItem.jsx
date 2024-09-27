import { useState } from 'react';
import { API_URL_STORAGE } from '../../constants';

import axios from 'axios'
import moment from 'moment/moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge'
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';

import { ConfirmFileDelete } from '../ConfirmFileDelete';
import { UpdateFile } from '../UpdateFile';

export const StorageItem = ({ file, getFiles }) => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const [showPopover, setShowPopover] = useState(false)
  const [target, setTarget] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const toggleUpdate = () => setShowUpdate(previousShow => {
    return !previousShow
  })
  const toggleDelete = () => setShowDelete(previousShow => {
    return !previousShow
  })
  const togglePopover = () => setShowPopover(previousShow => {
    return !previousShow
  })

  const handleDownload = () => {
    setIsLoading(true)

    axios
      .get(API_URL_STORAGE + file.id + '?download=true')
      .then(res => {
        const url = res.data.download_url
        const filename = res.data.filename

        const linkElement = document.createElement('a')
        linkElement.href = url
        linkElement.download = filename
        linkElement.target = '_blank'

        document.body.appendChild(linkElement)
        linkElement.click()
        document.body.removeChild(linkElement)

        getFiles()
      })
  }

  const handleCopy = (e) => {
    console.log(e)
    const url = e.currentTarget.url
    e.clipboardData.setData('text/plain', url);
    e.preventDefault();
  }

  const handleSpecialLink = (e) => {
    axios
      .get(API_URL_STORAGE + file.id + '?special=true')
      .then(res => {
        const url = res.data.special_url

        document.addEventListener('copy', handleCopy)
        document.url = url
        document.execCommand('copy');

        document.removeEventListener('copy', handleCopy)
      })

    togglePopover()
    setTarget(e.target)
    setTimeout(() => {
      togglePopover()
    }, 1000)
  }

  let formatedLastDownload = file.last_download
  if (file.last_download === null) {
    formatedLastDownload = 'Вы ещё не скачивали этот файл.'
  } else {
    formatedLastDownload = moment(file.last_download).format('DD.MM.YYYY HH:mm:ss')
  }

  const formatedCreated = moment(file.created).format('DD.MM.YYYY HH:mm:ss')

  let formatedSize = ''
  if (file.size < 1000) {
    formatedSize = `${file.size} б`
  } 
  if (file.size >= 1000) {
    const parsedSize = parseFloat(file.size / 1000).toFixed(1)
    formatedSize = `${parsedSize} Кб`
  } 
  if (file.size >= 1_000_000) {
    const parsedSize = parseFloat(file.size / 1000000).toFixed(1)
    formatedSize = `${parsedSize} Мб`
  }

  return (
    <tr>
      <td>{file.title}</td>
      <td>{formatedSize}</td>
      <td>{formatedCreated}</td>
      <td>{formatedLastDownload}</td>
      <td className='storage-comment'>{file.comment}</td>
      <td>
        <OverlayTrigger
          placement="top"
          delay={{ show: 200, hide: 250 }}
          overlay={
            <Tooltip id="download-tooltip">
              Скачать
            </Tooltip>
          }
        >
          <Badge bg='primary' text='light' disabled={isLoading} onClick={handleDownload}>
            <FontAwesomeIcon icon="fa-solid fa-download" />
          </Badge>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="edit-tooltip">
              Изменить
            </Tooltip>
          }
        >
          <Badge className='mx-4 mt-1' bg='success' text='light' onClick={toggleUpdate}>
            <FontAwesomeIcon icon="fa-solid fa-pencil" />
          </Badge>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="delete-tooltip">
              Удалить
            </Tooltip>
          }
        >
          <Badge className='me-4' bg='danger' text='light' onClick={toggleDelete}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </Badge>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="share-tooltip">
              Поделиться
            </Tooltip>
          }
        >
          <Badge bg='info' text='light' onClick={handleSpecialLink}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
          </Badge>
        </OverlayTrigger>

        <Overlay
          show={showPopover}
          target={target}
          placement="top"
        >
          <Popover id="storage-item-popover">
            <Popover.Body>
              Ссылка скопирована!
            </Popover.Body>
          </Popover>
        </Overlay>
      </td>

      <UpdateFile file={file} handleClose={toggleUpdate} show={showUpdate} />
      <ConfirmFileDelete id={file.id} handleClose={toggleDelete} show={showDelete} getFiles={getFiles} />
    </tr>
  )
}
