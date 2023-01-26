import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteFeed } from '../../../api/services/feeds';

function ButtonDelete({feed}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const removeFeed = (url)=> {
    deleteFeed(url).then((response) => {
      console.log(response);      
      handleClose();
    })
    .catch((error) => {
      setError(error);
    })
   .finally(()=>{
      window.location.reload();
    })
  };

  if (error) {
    console.log(error);
    return <p>Ups! Se produjo un error al borrar el feed {feed.name}.</p>
  }

  return (
    <>
        <Button title='Eliminar' className="btn-icon btn-rounded" variant={'outline-danger'} onClick={handleShow} >
            <i className='fas fa-trash-alt'/>
        </Button> 
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar {feed.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Corfirma la eliminación?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}> 
              Cancelar
            </Button>
            <Button variant="outline-danger" onClick={()=> removeFeed(feed.url)}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default ButtonDelete;