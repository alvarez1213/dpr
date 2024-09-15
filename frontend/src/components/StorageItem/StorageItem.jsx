import { useState } from 'react';

export const StorageItem = ({ file }) => {
  
  return (
    <tr>
      <td>{file.title}</td>
      <td>{file.size}</td>
      <td>{file.created}</td>
      <td>{file.last_download}</td>
      <td className='storage-comment'>{file.comment}</td>
      <td>        
      </td>      
    </tr>
  )
}
