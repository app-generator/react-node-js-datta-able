import React,{ useState, useEffect} from 'react'
import {
  Button,Card, Table , Modal, Row,Col, Form, CloseButton, Spinner
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import CallBackendByName from '../../../components/CallBackendByName'; 
import { getTaxonomy } from '../../../api/services/taxonomies';
import { getTLPSpecific } from '../../../api/services/tlp';
import { getFeed } from '../../../api/services/feeds';
import { deleteEvent} from "../../../api/services/events";
import Ordering from '../../../components/Ordering/Ordering'

const TableEvents = ({events, loading, selectedEvent, setSelectedEvent, order, setOrder, setLoading, currentPage}) => {

    const [deleteName, setDeleteName] = useState()
    const [deleteUrl, setDeleteUrl] = useState()
    const [remove, setRemove] = useState()
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    //checkbox
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => { 
        setList(events)
        console.log(events)
       
      }, [events]);
   
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }

    
    const callbackTaxonomy = (url ,setPriority) => {
        getTaxonomy(url)
        .then((response) => {
         
            setPriority(response.data)
        })
        .catch();
    }
    const callbackTlp = (url ,setPriority) => {
        getTLPSpecific(url)
        .then((response) => {
          
            setPriority(response.data)
        })
        .catch();
    }
    const callbackFeed = (url ,setPriority) => {
        getFeed(url)
        .then((response) => {
         
            setPriority(response.data)
        })
        .catch();
    }
    
    const modalDelete = (name, url)=>{
        setDeleteName(name)
        setDeleteUrl(url) 
        setRemove(true)
    }

    const handleDelete = () => {
        deleteEvent(deleteUrl).then(() => {
            window.location.href = '/events';
          })
          .catch((error) => {
            setError(error);
          })
    }
        ////////////////////////////////////////////////////
     
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setSelectedEvent(events.filter(item => item.solve_date == null).map(li => li.url));
        if (isCheckAll) {
            setSelectedEvent([]);
        }
      };
    
      const handleClick = e => { 
        const { id, checked } = e.target;
        setSelectedEvent([...selectedEvent, id]);
        if (!checked) {
          setSelectedEvent(selectedEvent.filter(item => item !== id));
        }
      };
    
      ////////////////////////////////////////////////////
    
  return (
    <div>
        
            <ul className="list-group my-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>
                                <Form.Group>
                                    <Form.Check type="checkbox" id={"selectAll"}  
                                        onChange={handleSelectAll} checked={selectedEvent.length != 0 ? isCheckAll : false} /> {/*|| selectedCases == list.filter(item => item.solve_date == null).length */}
                                </Form.Group>
                            </th>
                            <th>#</th>
                            <Ordering field="date" label="Fecha" order={order} setOrder={setOrder} setLoading={setLoading} />
                            <th>TLP</th>
                            <th>Taxonomia</th>
                            <th>Fuente de Informacion</th>
                            <th>Opciones</th>
                        </tr>
                   </thead>
                    <tbody>
                    {list.map((event, index) => {
                        return (
                            <tr>
                                <th ><Form.Group>
                                            <Form.Check disabled={event.solve_date != null ? true : false} 
                                                type="checkbox" id={event.url} 
                                                onChange={handleClick} checked={selectedEvent.includes(event.url)} />
                                        </Form.Group>
                                </th>
                                <td>{1+index+10*(currentPage-1)}</td>

                                <td>{event.date ? event.date.slice(0,10)+" "+event.date.slice(11,19): ""}</td>
                                
                                <td><CallBackendByName url={event.tlp} callback={callbackTlp } useBadge={true}/></td>
                                
                                <td><CallBackendByName url={event.taxonomy} callback={callbackTaxonomy} useBadge={false}/></td>
                                
                                <td><CallBackendByName url={event.feed} callback={callbackFeed} useBadge={false}/></td>
                                
                                <td>
                                <Link to={{pathname:"/events/view", state: event}} >
                                    <CrudButton  type='read'   />
                                </Link>
                                
                                <Link to={{pathname:"/events/edit", state: event}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                    <CrudButton  type='delete' onClick={()=>modalDelete(event.name, event.url)} />
                                </td>
                                
                              </tr>
                              )
                        })}
        <ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/> 

                    </tbody>
                </Table>
                      </ul>
                      <ModalConfirm type='delete' component='Estado' name={deleteName} showModal={remove} onHide={() => setRemove(false)} ifConfirm={() => handleDelete(deleteUrl)}/>    

<Modal size='lg' show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>            
            <Modal.Body>
                <Row>    
                    <Col>                 
                        
                    </Col> 
                </Row>
            </Modal.Body>            
        </Modal>

    </div>
  )
}

export default TableEvents