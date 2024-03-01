import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Col, Row , Collapse} from 'react-bootstrap';
import CrudButton from '../../components/Button/CrudButton'; 
import TableCase from './components/TableCase'; 
import { getCases, mergeCase } from '../../api/services/cases';
import { getMinifiedPriority } from "../../api/services/priorities";
import {getTLP, getMinifiedTlp } from '../../api/services/tlp';
import { getMinifiedState } from '../../api/services/states'
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import Alert from '../../components/Alert/Alert';
import ButtonFilter from '../../components/Button/ButtonFilter';
import FilterSelectUrl from '../../components/Filter/FilterSelectUrl';


const ListCase = () => {
    const [cases, setCases] = useState([]) //lista de casos
    const [ifModify, setIfModify] = useState(null) 
    const [loading, setLoading] = useState(true)
    
    //merge
    const [selectedCases, setSelectedCases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    //Alert
    const [showAlert, setShowAlert] = useState(false); 
    //Pagination    
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(0);
    const [updatePagination, setUpdatePagination] = useState(false)
    const [disabledPagination, setDisabledPagination] = useState(true)
    //filters
    const [order, setOrder] = useState("");
    const [wordToSearch, setWordToSearch]= useState('')
    const [open, setOpen] = useState(false);

    const [priorities, setPriorities] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState("");

    const [tlpFilter, setTlpFilter] = useState("");
    const [tlps, setTlps] = useState([]);

    const [states, setStates] = useState([]);
    const [stateFilter, setStateFilter] = useState("");

    //url by name
    const [priorityNames, setPriorityNames] = useState({});
    const [tlpNames, setTlpNames] = useState({});
    const [stateNames, setStateNames] = useState({});
     

    const [refresh,setRefresh]= useState(true)
    function updatePage(chosenPage){
        setCurrentPage(chosenPage);
    }  
    //ORDER
    useEffect( ()=> {
        getMinifiedState()
        .then((response) => {
            let stateOp = []
            let dicState={}
            response.map((state) => {
                stateOp.push({value: state.url, label: state.name})
                dicState[state.url]= state.name
            })
            setStateNames(dicState)
            setStates(stateOp)
        })
        .catch((error)=>{
            console.log(error)
        })
        getMinifiedPriority()
        .then((response) => {
            let priorityOp = []
            let dicPriority={}
            response.map((priority) => {
                priorityOp.push({value: priority.url, label: priority.name})
                dicPriority[priority.url]= priority.name
            })
            setPriorityNames(dicPriority)
            setPriorities(priorityOp)
            
        })
        .catch((error)=>{
            console.log(error)
        })

        getTLP()
            .then((response) => {
                let list = []
                let dicTlp = {}
                response.data.results.map((tlp) => {
                    list.push({value: tlp.url, label: tlp.name})
                    dicTlp[tlp.url]=tlp.name
                })
                setTlpNames(dicTlp) 
                setTlps(list)
            })
            .catch((error)=>{
                console.log(error)
            })
        //getCases(currentPage,priorityFilter+tlpFilter+stateFilter+wordToSearch, order) 
        getCases(currentPage,priorityFilter+tlpFilter+stateFilter+wordToSearch, order) 
            .then((response) => {
                setCases(response.data.results)
                console.log(response.data.results)
                setCountItems(response.data.count);
                // Pagination
                if(currentPage === 1){
                    setUpdatePagination(true)  
                }
                setDisabledPagination(false)
                
            })
            .catch((error) => {
            })
            .finally(() => {
                setShowAlert(true)
                console.log("entro")
                setLoading(false)
            })
        
    }, [currentPage, ifModify, order, wordToSearch, priorityFilter, tlpFilter, stateFilter, refresh])


    //-----------------MERGE------------------------
    const mergeConfirm = () => {
        setShowModal(true);
    }

    const merge = () => {
        const parent = selectedCases.shift();
        selectedCases.forEach(child => {
            console.log(`MERGE --> parent: ${parent} \n          child:${child} `)
            mergeCase(parent, child)
                .then(response => setIfModify(response))
                .catch(error => console.log(error))
                .finally(() => {
                    setSelectedCases([])
                    setShowModal(false)
                })
        });
    }

    const reloadPage = () => {
        setRefresh(!refresh)
      }
    

    return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="case"/>
        <Row>
            <Navigation actualPosition={'Casos'}/>  
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={1} lg={1}>
                              <ButtonFilter open={open} setOpen={setOpen} />
                            </Col>
                            <Col sm={1} lg={6}>
                                <Search type="caso" setWordToSearch={setWordToSearch} wordToSearch={wordToSearch} setLoading={setLoading}/> 
                            </Col>
                            <Col>
                                <Link to={{pathname:'/cases/create'}} >
                                    <CrudButton type='create' name='Caso' />
                                </Link>
                             
                                <Button 
                                    disabled={selectedCases.length > 1 ? false : true}
                                    size="lm"
                                    className='text-capitalize'
                                    variant='light'
                                    title='Mergear'
                                    onClick={() => mergeConfirm()}>
                                    <i variant='danger' className="fa fa-code-branch"/>
                                        Merge&nbsp;
                                    <Badge  
                                        className="badge mr-1" >
                                        {selectedCases.length} 
                                    </Badge>
                                </Button>  
                                <Button 
                                    size="lm"
                                    variant="outline-dark"
                                    onClick={() => reloadPage()}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg>
                                </Button>
                            </Col>
                        </Row>                        
                        <Row>
                            
                        </Row>
                        <br/>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                           
                            <Row>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={priorities} itemName="prioridad" partOfTheUrl="priority" itemFilter={priorityFilter}  itemFilterSetter={setPriorityFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={tlps} itemName="tlp" partOfTheUrl="tlp" itemFilter={tlpFilter}  itemFilterSetter={setTlpFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                                <Col sm={4} lg={4}>
                                    <FilterSelectUrl options={states} itemName="estados" partOfTheUrl="state" itemFilter={stateFilter}  itemFilterSetter={setStateFilter} setLoading={setLoading} setCurrentPage={setCurrentPage}/>
                                </Col>
                            </Row>
                            <br /> 
                            </div>
                        </Collapse> 
                    </Card.Header>
                    <Card.Body>
                        <TableCase cases={cases} loading={loading} selectedCases={selectedCases} setSelectedCases={setSelectedCases} 
                                order={order}  setOrder={setOrder} setIfModify={setIfModify} setLoading={setLoading} currentPage={currentPage}
                                priorityNames={priorityNames}  stateNames={stateNames}/>
                    </Card.Body>
                    <Card.Footer >
                        <Row className="justify-content-md-center">
                            <Col md="auto"> 
                                <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} 
                                                    setUpdatePagination={setUpdatePagination} setLoading={setLoading} 
                                                    setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination} />
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        <ModalConfirm type='merge' component='casos' name={selectedCases} showModal={showModal} onHide={() => setShowModal(false)} ifConfirm={() => merge()}/>

    </React.Fragment>
)}

export default ListCase; 
