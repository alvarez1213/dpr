import { useState } from 'react';
import { API_URL_STORAGE } from '../../constants';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge'

import { ConfirmFileDelete } from '../ConfirmFileDelete';
import { UpdateFile } from '../UpdateFile';

export const StorageItem = ({ file, getFiles }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleUpdate = () => setShowUpdate(previousShow => {
    return !previousShow
  });
  const toggleDelete = () => setShowDelete(previousShow => {
    return !previousShow
  });

  const handleDownload = () => {
    setIsLoading(true);

    axios
      .get(API_URL_STORAGE + file.id + '?download=true')
      .then((res) => {
        const pathToFile = res.data.url;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', pathToFile);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.readyState === 200) {
            const url = xhr.responseURL;
            navigator.download(url);
          }
        };
        xhr.send();
      })
  }

  const lastDownloadDate = new Date(file.last_download);
  const newLastDownload = `${lastDownloadDate.getDate()}/${lastDownloadDate.getMonth() + 1}/${lastDownloadDate.getFullYear()}`

  const createdDate = new Date(file.created);
  const newCreated = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`

  return (
    <tr>
      <td>{file.title}</td>
      <td>{file.size}</td>
      <td>{newCreated}</td>
      <td>{newLastDownload}</td>
      <td className='storage-comment'>{file.comment}</td>
      <td>
        <Badge bg='primary' text='light' aria-disabled={isLoading} onClick={handleDownload}>
          <FontAwesomeIcon icon="fa-solid fa-download" />
        </Badge>
        <Badge className='mx-4 mt-1' bg='success' text='light' onClick={toggleUpdate}>
          <FontAwesomeIcon icon="fa-solid fa-pencil" />
        </Badge>
        <Badge bg='danger' text='light' onClick={toggleDelete}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </Badge>
      </td>
      <UpdateFile file={file} handleClose={toggleUpdate} show={showUpdate} />
      <ConfirmFileDelete id={file.id} handleClose={toggleDelete} show={showDelete} getFiles={getFiles} />
    </tr>
  )
}
