import React from 'react';
import { useState, useEffect } from 'react';
import ModalDetailEdge from './ModalDetailEdge';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import CrudButton from '../../../components/Button/CrudButton';
import ModalEditEdge from './ModalEditEdge';
import { getEdge, deleteEdge } from "../../../api/services/edges";

const RowEdge = (props) => {
    const [edge, setEdge] = useState('');
    const [error, setError] = useState(null)

    const [modalShow, setModalShow] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => { //props.setShowAlert

        showEdgeData(props.url)
       
        
    }, [props.url, props.edgeDeleted, props.edgeUpdated]);

    //Read State

    const showEdgeData = (url) => {

        getEdge(url)
        .then((response) => {
            setEdge(response.data)
        })
        .catch((error) => {
            console.log(error)
            props.setShowAlert(true)
        });
    }
    
    //Delete State
    const removeEdge = (url, name,)=> {
        deleteEdge(url, name)
            .then((response) => {
                console.log(response)
                props.setEdgeDeleted(response)
                
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
            .finally(() => {
                setModalDelete(false)
                props.setShowAlert(true)
            })
    };
    

    

return (
        edge && 
        <React.Fragment>
            <tr key={edge.url}>
                <th scope="row">{props.id}</th>
                <td>{edge.discr}</td>
                <td>{props.urlByStateName[edge.child]} </td>
                                              
                <td>
                    <CrudButton type='read' onClick={() => setModalShow(true)} />
                    <CrudButton type='edit' onClick={() => setModalEdit(true)}/>
                    <CrudButton type='delete' onClick={() => setModalDelete(true)} />
                </td>
            </tr>

            <ModalDetailEdge show={modalShow} edge={edge} laterStateName={props.urlByStateName[edge.child]} onHide={() => setModalShow(false)}/>
            <ModalEditEdge show={modalEdit} edge={edge} urlByStateName={props.urlByStateName} childrens={props.listChildren} onHide={() => setModalEdit(false)} ifEdit={props.setEdgeUpdated} setShowAlert={props.setShowAlert} />
            <ModalConfirm showModal={modalDelete} type='delete' component='Edge' name={edge.discr}  onHide={() => setModalDelete(false)} ifConfirm={() => removeEdge(edge.url, edge.discr)}/>

        </React.Fragment>
    );
}

export default RowEdge