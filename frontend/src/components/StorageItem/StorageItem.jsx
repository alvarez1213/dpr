import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge'

import { ConfirmFileDelete } from '../ConfirmFileDelete';
import { UpdateFile } from '../UpdateFile';

export const StorageItem = ({ file }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleUpdate = () => setShowUpdate(previousShow => {
    return !previousShow
  });
  const toggleDelete = () => setShowDelete(previousShow => {
    return !previousShow
  });

  return (
    <tr>
      <td>{file.title}</td>
      <td>{file.size}</td>
      <td>{file.created}</td>
      <td>{file.last_download}</td>
      <td className='storage-comment'>{file.comment}</td>
      <td>
        <Badge className='mx-4 mt-1' bg='success' text='light' onClick={toggleUpdate}>
          <FontAwesomeIcon icon="fa-solid fa-pencil" />
        </Badge>
        <Badge bg='danger' text='light' onClick={toggleDelete}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </Badge>
      </td>
      <UpdateFile file={file} handleClose={toggleUpdate} show={showUpdate} />
      <ConfirmFileDelete id={file.id} handleClose={toggleDelete} show={showDelete} />
    </tr>
  )
}
