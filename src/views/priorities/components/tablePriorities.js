import React,{ useState} from 'react'
import {
  Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { deletePriority } from "../../../api/services/priorities";
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';


const TablePriorities = ({Priorities, callback, loading}) => {
    const [remove, setRemove] = useState(false);
    const [deleteName, setDeleteName] = useState("");
    const [deleteUrl, setDeleteUrl] = useState("");
    const [error, setError] = useState(null);
    const [priority, setPriority] = useState({});
    const [modalShow, setModalShow] = useState(false);
   
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
  
    const handleShow = (name, url) => {

        setDeleteName(name)
        setDeleteUrl(url) 
        setRemove(true)
       
      }

    const handleDelete = () => {
        deletePriority(deleteUrl).then((response) => {
            callback(`El usuario ${deleteName} ha sido eliminado`, true)
        })
        .catch((error) => {
            setError(error)
            callback(`El usuario ${deleteName} NO ha sido eliminado`, false)
        })
        .finally(() => {
            setRemove(false)
        })
      }
      const showModalPriority = (priority) => {

        setPriority(priority)
        setModalShow(true)
       
      }
  return (
   <div>
      <Card>
        <Card.Body>
            <ul className="list-group my-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha limite de respuesta</th>
                            <th>Fecha limite de resolucion </th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                       {Priorities.map((priority, index) => {
                        return (
                            <tr>
                                <th >{index + 1 }</th>
                                <td>{priority.name}</td>
                                <td>{priority.attend_deadline}</td>
                                <td>{priority.solve_deadline}</td>
                                
                                <td>
                                <CrudButton  type='read' onClick={() => {showModalPriority(priority)}} />
                                
                                <Link to={{pathname:"./edit-Priority", state: {priority}}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                    <CrudButton  type='delete' onClick={()=>handleShow(priority.name, priority.url)} />
                                </td>
                                
                                    </tr>
                              )
                            })}
          <Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        <Card>
                            <Card.Header> 
                                <Row>
                                    <Col>
                                        <Card.Title as="h5">Prioridad</Card.Title>
                                        <span className="d-block m-t-5">Detalle de Prioridad</span>
                                    </Col>
                                    <Col sm={12} lg={4}>                       
                                    <Link to={{pathname:"./edit-Priority", state: {priority}}} >
                                        <CrudButton  type='edit' />
                                    </Link>
                                        <CloseButton aria-label='Cerrar' onClick={() => setModalShow(false)} />
                                    </Col>
                                </Row>         
                            </Card.Header>
                            <Card.Body>
                                <Table responsive > 
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.name} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha limite de respuesta</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.attend_deadline} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fecha limite de resolucion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.solve_deadline} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Severidad</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.severity} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Creado el</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.created ? priority.created.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ultima Actulizacion</td>
                                        <td>
                                            <Form.Control plaintext readOnly defaultValue={priority.modified ? priority.modified.slice(0,10) : ""} />
                                        </td>
                                    </tr>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>
        <ModalConfirm type='delete' component='Prioridad' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    
                            </tbody>
                        </Table>
                      </ul>
                </Card.Body>  
     </Card>
  </div>
                        )
}

export default TablePriorities