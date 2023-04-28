import React, { useEffect, useState } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { getPriorities } from '../../../api/services/priorities';
import { getTLP } from '../../../api/services/tlp';
import { getUsers } from '../../../api/services/users';

const FormCase = (props) => { 
// props: ifConfirm, save, date, setDate, lifecycle, setLifecycle, priority, setPriority, tlp, setTlp, state, setState
// put: commentarios, 
// evidencia, solve_date, attend_date

//select
const [allPriorities, setAllPriorities ] = useState([])
const [allTlp, setAllTlp] = useState([])
const [allUsers, setAllUsers] = useState([])

    useEffect(()=> {
        
        getPriorities()
        .then((response) => {
            setAllPriorities (Object.values(response.data.results))
            console.log(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })

        getTLP()
        .then((response) => {
            setAllTlp(response.data.results)
            console.log(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })

        getUsers()
        .then((response) => {
            setAllUsers(response.data.results)
            console.log(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[])

    const allLifecycles = [
        {
            value: "manual",
            display_name: "Manual"
        },
        {
            value: "auto",
            display_name: "Auto"
        },
        {
            value: "auto_open",
            display_name: "Auto open"
        },
        {
            value: "auto_close",
            display_name: "Auto close"
        }
    ]
    
    //
    const selectEvidences = (event) => {
        const files = event.target.files;
        console.log(files)
        const evidences = [];
        for (let i = 0; i < files.length; i++) {
          evidences.push(files[i]);
        }
        props.setEvidences(evidences);
      }

      const selectEvidences2 = (event) => {
        props.setEvidences(event.target.files)
        console.log(props.evidences)
        console.log(event.target.files)
      }

    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group controlId="Form.Case.Date">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="datetime-local" //2023-03-24T01:40:14.181622Z 
                                value={props.date} //yyyy-mm-ddThh:mm
                                min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                isInvalid={props.date == null}
                                isValid={props.date !== null}
                                onChange={(e) =>  props.setDate(e.target.value)}/>
                        </Form.Group> 
                        <Form.Group controlId="Form.Case.Lifecycle">
                            <Form.Label>Ciclo de vida</Form.Label>
                            <Form.Control
                                name="lifecycle"
                                type="choice"                                            
                                as="select"
                                value={props.lifecycle}
                                isInvalid={props.lifecycle == '0'}
                                isValid={props.lifecycle !== '0'}
                                onChange={(e) =>  props.setLifecycle(e.target.value)}>
                                <option value='0'>Seleccione</option>
                                {allLifecycles.map((lifecycleItem, index) => {                
                                    return (
                                        <option key={index} value={lifecycleItem.value}>{lifecycleItem.display_name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.lifecycle ? '' : <div className="invalid-feedback">Seleccione el ciclo de vida</div>}
                        </Form.Group>
                        <Form.Group controlId="Form.Case.Priority">
                            <Form.Label>Prioridad</Form.Label>
                                <Form.Control
                                    name="priority"
                                    type="choice"                                            
                                    as="select"
                                    value={props.priority}
                                    isInvalid={props.priority == '0'}
                                    isValid={props.priority !== '0'}
                                    onChange={(e) =>  props.setPriority(e.target.value)}>
                                    <option value='0'>Seleccione</option>
                                    {allPriorities.map((priorityItem, index) => {                
                                        return (
                                            <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                        );
                                    })}
                                </Form.Control>
                                {props.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                        </Form.Group>
                        <Form.Group controlId="Form.Case.Tlp">
                        <Form.Label>TLP</Form.Label>
                            <Form.Control
                                name="tlp"
                                type="choice"                                            
                                as="select"
                                value={props.tlp}
                                isInvalid={props.tlp == '0'}
                                isValid={props.tlp !== '0'}
                                onChange={(e) =>  props.setTlp(e.target.value)}>
                                <option value='0'>Seleccione</option>
                                {allTlp.map((tlpItem, index) => {                
                                    return (
                                        <option key={index} value={tlpItem.url}>{tlpItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.tlp ? '' : <div className="invalid-feedback">Seleccione</div>}
                        </Form.Group>
                        <Form.Group controlId="Form.Case.State">
                        <Form.Label>Estado</Form.Label>
                            <Form.Control
                                name="state"
                                type="choice"                                            
                                as="select"
                                value={props.state}
                                isInvalid={props.state == '0'}
                                isValid={props.state !== '0'}
                                onChange={(e) =>  props.setState(e.target.value)}>
                                <option value='0'>Seleccione</option>
                                {props.allStates.map((stateItem, index) => {                
                                return (
                                    <option key={index} value={stateItem.value}>{stateItem.label}</option>
                                );
                            })}
                            </Form.Control>
                            {props.state ? '' : <div className="invalid-feedback">Seleccione el estado</div>}
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Group controlId="Form.Case.Attend_date">
                            <Form.Label>Fecha de atencion</Form.Label>
                            <Form.Control type="datetime-local"
                                value={props.attend_date} //yyyy-mm-ddThh:mm
                                min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                onChange={(e) =>  props.setAttend_date(e.target.value)}/>
                        </Form.Group> 
                        <Form.Group controlId="Form.Case.Solve_date">
                            <Form.Label>Fecha de resolucion</Form.Label>
                            <Form.Control type="datetime-local"
                                value={props.solve_date} //yyyy-mm-ddThh:mm
                                min="2000-01-01T00:00" max="2030-01-01T00:00" 
                                onChange={(e) =>  props.setSolve_date(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="Form.Case.Assigned">
                            <Form.Label>Asignado</Form.Label>
                            <Form.Control
                                name="assigned"
                                type="choice"                                            
                                as="select"
                                value={props.assigned}
                                onChange={(e) =>  props.setAssigned(e.target.value)}>
                                <option value={null}>Sin designar</option>
                                {allUsers.map((userItem, index) => {                
                                    return (
                                        <option key={index} value={userItem.url}>{userItem.username}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                        {props.edit ? 
                            <Form.Group controlId="Form.Case.Comments">
                                <Form.Label>Comentarios ???</Form.Label>
                                <Form.Control placeholder="Comentarios" />
                            </Form.Group>
                        : <></>}
                        <Form.Group controlId="Form.Case.Evidences.Drag&Drop">
                        <Form.Label>Evidencia</Form.Label>
                            <Form.Control 
                            type="file"
                            placeholder="Ingrese " 
                            maxlength="150" 
                            multiple
                            onChange={(e)=>selectEvidences(e)}
                            name="evidence"/>
                        </Form.Group> 
                    </Col>
                </Row>
            </Form> 
                 
                {!props.date || !props.lifecycle || !props.priority || !props.tlp || !props.state ? 
                    <><Button variant="primary" disabled>{props.save}</Button></> 
                    : 
                    <><Button variant="primary" onClick={props.ifConfirm}>{props.save}</Button></>}
                <Button variant="primary" href="/cases">Cancelar</Button>
        </React.Fragment>
    );
};
            
export default FormCase;