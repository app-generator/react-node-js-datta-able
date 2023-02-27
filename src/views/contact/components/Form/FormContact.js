import React, { useState } from 'react';
import {Button, Col, Row, Form} from 'react-bootstrap';
import { validateSpace, validateAlphanumeric  } from '../../../../components/Validator/validators'; 
import FormContactPriority from './FormContactPriority';

const FormContact = (props) => { 
    // props: name, setName, role, setRole, priority, setPriority, type, setType, contact, setContact, key, setKey, ifConfirm
    const [validContact, setValidContact] = useState(false) 

    const roleOptions = [
        {
            value : '0',
            name : 'Seleccione'
        },
        {
            value : 'technical',
            name : 'Tecnico'
        },
        {
            value : 'administrative',
            name : 'Administrativo'
        },
        {
            value : 'abuse',
            name : 'Abuso'
        },
        {
            value : 'notifications',
            name : 'Notificaciones'
        },
        {
            value : 'noc',
            name : 'NOC'
        },
    ]

    const typeOptions = [
        {
            value : '0',
            name : 'Seleccione'
        },
        {
            value : 'email',
            name : 'Correo Electronico'
        },
        {
            value : 'telegram',
            name : 'Telegram'
        },
        {
            value : 'phone',
            name : 'Telefono'
        },
        {
            value : 'uri',
            name : 'URI'
        },
    ]

    const getPriority = {
        "count": 5,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://localhost:8000/api/administration/priority/1/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-05-27T20:03:30.447000Z",
                "name": "Critical",
                "severity": 1,
                "attend_time": "00:00:00",
                "solve_time": "01:00:00",
                "attend_deadline": "00:01:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/3/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:26:44.802000Z",
                "name": "High",
                "severity": 2,
                "attend_time": "00:10:00",
                "solve_time": "04:00:00",
                "attend_deadline": "03:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/2/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:26:25.310000Z",
                "name": "Medium",
                "severity": 3,
                "attend_time": "01:00:00",
                "solve_time": "08:00:00",
                "attend_deadline": "07:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/6/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:33:40.089000Z",
                "name": "Low",
                "severity": 4,
                "attend_time": "04:00:00",
                "solve_time": "2 00:00:00",
                "attend_deadline": "1 00:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            },
            {
                "url": "http://localhost:8000/api/administration/priority/5/",
                "color": "#FFFFFF",
                "created": "2019-03-22T16:24:33Z",
                "modified": "2022-04-09T00:19:17.743000Z",
                "name": "Very Low",
                "severity": 5,
                "attend_time": "1 00:00:00",
                "solve_time": "7 00:00:00",
                "attend_deadline": "1 00:00:00",
                "solve_deadline": "2 00:00:00",
                "notification_amount": 3
            }
        ]
    };

    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group controlId="Form.Contact.Name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="nombre" 
                                placeholder="Nombre" 
                                maxlength="100"
                                value={props.name} 
                                onChange={(e) => props.setName(e.target.value)} 
                                isInvalid={!validateAlphanumeric(props.name) || !validateSpace(props.name)}
                                isValid={validateAlphanumeric(props.name) && validateSpace(props.name)}
                                />
                            {validateSpace(props.name) ? '' : <div className="invalid-feedback">Ingrese nombre</div>}
                            {!props.name || validateAlphanumeric(props.name) ? "" : <div className="invalid-feedback">Ingrese caracteres validos</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Form.Contact.Rol">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                name="role"
                                type="choice"
                                as="select"
                                value={props.role}
                                isInvalid={props.role === '0'}
                                isValid={props.role !== '0'}
                                onChange={(e) => props.setRole(e.target.value)}>
                                {roleOptions.map((roleItem, index) => {                
                                    return (
                                        <option key={index} value={roleItem.value}>{roleItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.role!=='' ? '' : <div className="invalid-feedback">Seleccione el rol</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Form.Contact.Priority" >
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
                                {getPriority.results.map((priorityItem, index) => {                
                                    return (
                                        <option key={index} value={priorityItem.url}>{priorityItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.priority ? '' : <div className="invalid-feedback">Seleccione la prioridad</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group controlId="Form.Contact.Type">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                name="type"
                                type="choice"
                                as="select"
                                value={props.type}
                                isInvalid={props.type == '0'}
                                isValid={props.type !== '0'}
                                onChange={(e) =>  props.setType(e.target.value)}>
                                {typeOptions.map((typeItem, index) => {                
                                    return (
                                        <option key={index} value={typeItem.value}>{typeItem.name}</option>
                                    );
                                })}
                            </Form.Control>
                            {props.type ? '' : <div className="invalid-feedback">Seleccione el tipo de contacto</div>}
                        </Form.Group>
                    </Col>
                    <Col lg={8}>
                        <FormContactPriority selectedType={props.type} 
                            contact={props.contact} setContact={props.setContact}
                            setValidContact={setValidContact} />                   
                    </Col>
                </Row>
                <Form.Group controlId="Form.Contact.Key">
                    <Form.Label>Clave publica</Form.Label>
                    <Form.Control 
                        type="string"
                        placeholder="Llave pública GPG"
                        value={props.key}
                        maxlength="4000"
                        onChange={(e) =>  props.setKey(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    {(!validateSpace(props.name) || !validateAlphanumeric(props.name) 
                    || (props.role == '0') || (props.priority == '0' ) || (props.type == '0')
                    || !validateSpace(props.contact) || (!validContact)) ? 
                        <><Button variant="primary" disabled>Guardar</Button></> 
                        : 
                        <><Button variant="primary" onClick={props.ifConfirm} >Guardar</Button></>
                    }
                        <Button variant="primary" href="/contact/tables">Cancelar</Button>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
};
            
export default FormContact;
