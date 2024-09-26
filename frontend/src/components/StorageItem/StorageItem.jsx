import { useState } from 'react';
import { API_URL_STORAGE } from '../../constants';

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge'
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import { ConfirmFileDelete } from '../ConfirmFileDelete';
import { UpdateFile } from '../UpdateFile';

export const StorageItem = ({ file, getFiles }) => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const [showPopover, setShowPopover] = useState(false)
  const [target, setTarget] = useState(null)
  const [specialLink, setSpecialLink] = useState('')

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
        const url = res.data.temp_url
        setSpecialLink(res.data.special_url)
        const filename = res.data.filename

        const linkElement = document.createElement('a')
        linkElement.href = url
        linkElement.download = filename
        linkElement.target = '_blank'

        document.body.appendChild(linkElement)
        linkElement.click()
        document.body.removeChild(linkElement)
      })
  }

  const handleSpecialLink = (e) => {
    if (specialLink === '') {
      axios
        .get(API_URL_STORAGE + file.id + '?download=true')
        .then(res => {
          navigator.clipboard.writeText(res.data.special_url)
        })
    } else {
      navigator.clipboard.writeText(specialLink)
    }

    togglePopover()
    setTarget(e.target)
    setTimeout(() => {
      togglePopover()
    }, 1000)
  }

  const lastDownloadDate = new Date(file.last_download);
  const formatedLastDownload = `${lastDownloadDate.getDate()}/${lastDownloadDate.getMonth() + 1}/${lastDownloadDate.getFullYear()}`

  const createdDate = new Date(file.created);
  const formatedCreated = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`

  return (
    <tr>
      <td>{file.title}</td>
      <td>{file.size}</td>
      <td>{formatedCreated}</td>
      <td>{formatedLastDownload}</td>
      <td className='storage-comment'>{file.comment}</td>
      <td>
        <Badge bg='primary' text='light' disabled={isLoading} onClick={handleDownload}>
          <FontAwesomeIcon icon="fa-solid fa-download" />
        </Badge>
        <Badge className='mx-4 mt-1' bg='success' text='light' onClick={toggleUpdate}>
          <FontAwesomeIcon icon="fa-solid fa-pencil" />
        </Badge>
        <Badge className='me-4' bg='danger' text='light' onClick={toggleDelete}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </Badge>

        <Badge bg='info' text='light' onClick={handleSpecialLink}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
        </Badge>
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
