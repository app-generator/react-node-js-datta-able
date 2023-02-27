import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteFeed } from '../../../api/services/feeds';
import CrudButton from '../../../components/Button/CrudButton';

function ButtonDelete({feed, callback}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const removeFeed = ()=> {
    deleteFeed(feed.url).then((response) => {
      console.log(response);
      callback(`La fuente de informacion ${feed.name} ha sido eliminada`, true)
    })
    .catch((error) => {
      setError(error);
      if(error){
        callback(`La fuente de información ${feed.name} NO ha sido eliminada`, false)
      }
    })
   .finally(()=>{
      handleClose();
    })
  };

  return (
    <>
        <CrudButton type='delete' onClick={handleShow} />
        <Modal show={show} onHide={handleClose} centered >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar {feed.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={removeFeed}>
              Eliminar
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}> 
              Cancelar
            </Button>            
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default ButtonDelete;