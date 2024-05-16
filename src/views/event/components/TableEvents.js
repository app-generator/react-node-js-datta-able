import React,{ useState, useEffect} from 'react'
import { Table , Modal, Row,Col, Form,  Spinner, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import CrudButton from '../../../components/Button/CrudButton';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import { deleteEvent} from "../../../api/services/events";
import Ordering from '../../../components/Ordering/Ordering'
import LetterFormat from '../../../components/LetterFormat';
import { useTranslation, Trans } from 'react-i18next';

const TableEvents = ({events, loading, selectedEvent, setSelectedEvent, order, setOrder, setLoading,  taxonomyNames, feedNames, tlpNames}) => {
    const { t } = useTranslation(); 
    const [deleteName, setDeleteName] = useState()
    const [deleteUrl, setDeleteUrl] = useState()
    const [remove, setRemove] = useState()
    const [modalShow, setModalShow] = useState(false);
    //checkbox
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => { 
        setList(events)
        
       
      }, [events]);
   
    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
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
              console.log(error)
          })
    }
     
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
    
      const letterSize= { fontSize: '1.1em' }
 
  return (
    <div>
        
            <ul className="list-group my-4">
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>
                                <Form.Group>
                                    <Form.Check type="checkbox" id={"selectAll"}  
                                        onChange={handleSelectAll} checked={selectedEvent.length !== 0 ? isCheckAll : false} /> {/*|| selectedCases == list.filter(item => item.solve_date == null).length */}
                                </Form.Group>
                            </th>
                        
                            <Ordering field="date" label={t('Fecha del Evento')} order={order} setOrder={setOrder} setLoading={setLoading} letterSize={letterSize}/>
                            <th style={letterSize}>{t('Identificador')} </th>
                            <th style={letterSize}>{t('Dominio')}</th>
                            <th style={letterSize}>{t('Cidr')}</th>
                            <th style={letterSize}>{t('TLP')}</th>
                            <th style={letterSize}>{t('Taxonomia')}</th>
                            <th style={letterSize}>{t('Fuente de Informacion')}</th>
                            <th style={letterSize}>{t('Opciones')}</th>
                        </tr>
                   </thead>
                    <tbody>
                    {list.map((event, index) => {
                        return (
                            <tr key={index}>
                                <th ><Form.Group>
                                            <Form.Check disabled={event.solve_date != null ? true : false} 
                                                type="checkbox" id={event.url} 
                                                onChange={handleClick} checked={selectedEvent.includes(event.url)} />
                                        </Form.Group>
                                </th>

                                <td>{event.date ? event.date.slice(0,10)+" "+event.date.slice(11,19): ""}</td>
                                <td>{event.address_value}</td>
                                <td>{event.domain}</td>
                                <td>{event.cidr}</td>
                                
                                <td>
                                    <LetterFormat useBadge={true} stringToDisplay={tlpNames[event.tlp].name} color={tlpNames[event.tlp].color}/>
                                </td>
                                
                                <td>{taxonomyNames[event.taxonomy]}</td>
                                
                                <td>{feedNames[event.feed]}</td>
                                
                                <td>
                                <Link to={{pathname:"/events/view", state: event}} >
                                    <CrudButton  type='read'   />
                                </Link>
                                
                                <Link to={{pathname:"/events/edit", state: event}} >
                                    <CrudButton  type='edit' />
                                </Link>
                                <CrudButton  type='delete' onClick={()=>modalDelete(event.name, event.url)} />

                              
                                { event.case ?  <Button className="btn-icon btn-rounded" disabled variant="outline-primary"
                                  style={{
                                    border: "1px solid #555", 
                                    borderRadius: "50px",
                                    color: "#555", 
                                  }}
                                   onClick={() => console.log("")}>
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                   </Button>:
                                    <Link to={{pathname:"/templates/create", state: event}} >
                                        <Button className="btn-icon btn-rounded" variant="outline-primary" onClick={() => console.log("")}>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </Button> 
                                   </Link>}
                                
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