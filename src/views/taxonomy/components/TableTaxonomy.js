import React from 'react';
import { useState } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import ButtonView from './ButtonView'
import ButtonState from './ButtonState';
import { deleteTaxonomy } from '../../../api/services/taxonomies';


const TableTaxonomy = ({setIsModify, list, loading }) => {
    const [modalDelete, setModalDelete] = useState(false) 
    const [url, setUrl] = useState(null) 
    const [name, setName] = useState(null) 

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    }
    
    // Remove Taxonomy
    const Delete = (url, name) => {
        setUrl(url)
        setName(name)
        setModalDelete(true)
    }
    
    const removeTaxonomy = (url, name)=> {
        deleteTaxonomy(url, name)
            .then((response) => {
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
        };
    
    
    return (
            <React.Fragment>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Activo</th>     
                            <th>Reportes</th>                                                                         
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.sort((a, b) => (a.name < b.name ? -1 : 1)).map((taxonomy,i) => (
                            <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{taxonomy.name}</td>
                                <td>
                                    <ButtonState taxonomy={taxonomy}></ButtonState>
                                </td>                                           
                                <td>{taxonomy.reports.length}</td>
                                <td>
                                    <ButtonView taxonomy={taxonomy}></ButtonView> 
                                    <Link to={{pathname:"./taxonomies/edit", state:taxonomy}} >
                                        <CrudButton type="edit" />                                                    
                                    </Link>                                               
                                    <CrudButton type='delete' onClick={() => Delete(taxonomy.url, taxonomy.name)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            
            <ModalConfirm type='delete' component='Taxonomia' name={name} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeTaxonomy(url, name)}/>
        </React.Fragment> 
  );
};

export default TableTaxonomy;