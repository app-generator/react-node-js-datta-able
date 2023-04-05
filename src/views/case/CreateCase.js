import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { postCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getEvents } from '../../api/services/events';
import { getEvidences } from '../../api/services/evidences';
import { getStates } from '../../api/services/states';

const CreateCase = () => {
    const [date, setDate] = useState(null) //required
    const [lifecycle, setLifecycle] = useState('0') //required
    const parent = null; 
    const [priority, setPriority] = useState('0') //required
    const [tlp, setTlp] = useState('0') //required
    const [assigned, setAssigned] = useState(null)
    
    const [state, setState] = useState('0') //required
    const [allStates, setAllStates] = useState([]) //multiselect

    const [comments, setComments] = useState([]) // lista de que ??
    
    const [evidences, setEvidences] = useState(null) // como se muestra
    const [allEvidences, setAllEvidences] = useState([]) //multiselect

    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([]) //multiselect

    const [attend_date, setAttend_date] = useState(null) //imprime la hora actual +3horas
    const [solve_date, setSolve_date] = useState(null)

    const [error, setError] = useState(null)

    useEffect(()=> {

        getEvents()
            .then((response) => {
                let listEvents = []
                response.data.results.map((eventItem)=>{
                    listEvents.push({value:eventItem.url, label:eventItem.name})
                })
                setAllEvents(listEvents)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        getEvidences()
            .then((response) => {
                let listEvidences = []
                response.data.results.map((evidencesItem)=>{
                    listEvidences.push({value:evidencesItem.url, label:evidencesItem.url})
                })
                setAllEvidences(listEvidences)
                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        getStates()
            .then((response) => {
                let listStates = []
                response.data.results.map((stateItem)=>{
                    listStates.push({value:stateItem.url, label:stateItem.name, childrenUrl:stateItem.children})
                })
                setAllStates(listStates)

                console.log(response.data.results)
            })
            .catch((error)=>{
                setError(error)
            })

        },[])

    //Create
    const addCase = () => {
        postCase(date, lifecycle, parent, priority, tlp, assigned, state, comments, evidences, events, attend_date, solve_date)
        .then((response) => { 
            console.log(response)
            window.location.href = "/case/tables"
        })
        .catch((error) => {
            setError(error)
            console.log(error)
        });    
    };
      console.log(allEvidences)
    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Crear Caso" path="/case/tables" index ="Casos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Casos</Card.Title>
                            <span className="d-block m-t-5">Agregar Caso</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12} lg={12}>
                                    <FormCase 
                                        date={date} setDate={setDate}
                                        lifecycle={lifecycle} setLifecycle={setLifecycle}
                                        priority={priority} setPriority={setPriority}
                                        tlp={tlp} setTlp={setTlp}
                                        assigned={assigned} setAssigned={setAssigned}
                                        state={state} setState={setState} allStates={allStates}
                                        
                                        evidences={evidences} setEvidences={setEvidences} allEvidences={allEvidences}
                                        events={events} setEvents={setEvents} allEvents={allEvents}
                                        attend_date={attend_date} setAttend_date={setAttend_date}
                                        solve_date={solve_date} setSolve_date={setSolve_date}

                                        ifConfirm={addCase} edit={false} save='Crear'/>

                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                {/*<Alert/>*/}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateCase;
