import React, { useState } from 'react';
import { Row, Table, Spinner } from 'react-bootstrap';
import CrudButton from '../../../components/Button/CrudButton';
import { getNetwork, deleteNetwork, isActive } from '../../../api/services/networks';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import ActiveButton from '../../../components/Button/ActiveButton';
import ModalDetailNetwork from './ModalDetailNetwork';
import { getEntity } from '../../../api/services/entities';
import FormGetName from '../../../components/Form/FormGetName';
import Ordering from '../../../components/Ordering/Ordering'

const TableNetwork = ({setIsModify, list, loading, order, setOrder, setLoading , currentPage, entityNames}) => {
    const [network, setNetwork] = useState('')

    const [modalDelete, setModalDelete] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const [url, setUrl] = useState(null)
    const [cidr, setCidr] = useState(null)
    const [active,setActive] = useState(null)

    if (loading) {
        return (
            <Row className='justify-content-md-center'>
                <Spinner animation='border' variant='primary' size='sm' />
            </Row>
        );    
    } 

    //Read Network
    const showNetwork = (url)=> {
        setUrl(url)
        setNetwork('')
        getNetwork(url)
        .then((response) => {
            setNetwork(response.data)
            console.log(response.data.contacts)
            setModalShow(true)
        })
        .catch((error) => {
            console.log(error)
        })
    };

    //Update Network
    const pressActive = (cidr, active, url) => {
        setUrl(url)
        setCidr(cidr)
        setActive(active)
        setModalState(true)
    }
    const switchState = (url, state, name)=> {
        isActive(url, !state, name)
            .then((response) => {
                console.log(response)
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalState(false)
                setModalShow(false)
            })
    };

    //Remove Network
    const Delete = (url, cidr) => {
        setUrl(url);
        setCidr(cidr)
        setModalDelete(true)    
    }

    const removeNetwork = (url)=> {
        deleteNetwork(url, cidr)
            .then((response) => {
                console.log(response)
                setIsModify(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setModalDelete(false)
            })
    };
    const letterSize= { fontSize: '1.1em' }

    return (
            <React.Fragment>
                <Table responsive hover className="text-center">
                    <thead>
                        <tr>
                            <th>Direción de valor </th>
                            <th>Dominio</th>
                            <th>Cidr</th>
                            {<Ordering field="type" label="Tipo" order={order} setOrder={setOrder} setLoading={setLoading} letterSize={letterSize}/>}
                            <th>Activo</th>
                            <th>Entidad</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((network, index) =>
                        {
                            return (
                                <tr key={network.url}>
                                    <td>{network.address_value}</td>
                                    <td>{network.domain}</td>
                                    <td>{network.cidr}</td>
                                    <td>{network.type === 'internal' ? 'Interna' : 'Externa'}</td>
                                    <td>
                                        <ActiveButton active={network.active} onClick={() => pressActive(network.cidr, network.active, network.url)} />
                                    </td>
                                    <td>
                                        {network.network_entity  ?
                                            entityNames[network.network_entity]:
                                            "-"
                                        }
                                    </td>
                                    <td>
                                        <CrudButton type='read' onClick={() => showNetwork(network.url)} />
                                        <Link to={{pathname:'/networks/edit', state: network}} >
                                            <CrudButton type='edit'/>
                                        </Link>
                                        <CrudButton type='delete' onClick={() => Delete(network.url, network.cidr)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            <ModalDetailNetwork show={modalShow} network={network} onHide={() => setModalShow(false)}/>
            <ModalConfirm type='delete' component='Red' name={cidr} showModal={modalDelete} onHide={() => setModalDelete(false)} ifConfirm={() => removeNetwork(url)}/>
            <ModalConfirm type='editState' component='Red' name={cidr} state={active} showModal={modalState} onHide={() => setModalState(false)} ifConfirm={() => switchState(url, active, cidr)}/>

        </React.Fragment> 
  );
};

export default TableNetwork;
