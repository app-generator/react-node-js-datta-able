import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { putContact } from '../../api/services/contacts';
import FormContact from './components/Form/FormContact';
import Navigation from '../../components/navigation/navigation';

const EditContact = () => {
    const contact = useLocation().state;
    
    const [supportedName, setSupportedName] = useState(contact.name);
    const [selectRol, setSelectRol] = useState(contact.role);
    const [supportedPriority, setSupportedPriority] = useState(contact.priority);
    const [supportedContact, setSupportedContact] = useState(contact.username);
    const [supportedKey, setSupportedKey] = useState(contact.public_key);
    const [selectType, setSelectType] = useState(contact.type);
    const [error, setError] = useState(null);

    const editContact = () => {
        putContact (contact.url, supportedName, supportedContact, supportedKey, selectType, selectRol, supportedPriority)
        .then((response) => { 
            window.location.href = "/contact/tables"
        })
        .catch((error) => {
            setError(error)
        });    
    };

    return (
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Editar Contacto" path="/contact/tables" index ="Contactos"/>
            </Row>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Contactos</Card.Title>
                            <span className="d-block m-t-5">Editar Contacto</span>
                        </Card.Header>
                        <Card.Body>
                        <FormContact 
                                name={supportedName} setName= {setSupportedName} 
                                role={selectRol} setRole={setSelectRol} 
                                priority={supportedPriority} setPriority={setSupportedPriority} 
                                type={selectType} setType={setSelectType} 
                                contact={supportedContact} setContact={setSupportedContact} 
                                key={supportedKey} setKey={setSupportedKey} 
                                ifConfirm={editContact} />
                        </Card.Body>
                    </Card>
                    {/*<Alert/>*/}
                    </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditContact;