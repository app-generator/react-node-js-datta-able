import React, { useState, useEffect} from 'react'
import { Card, Form, Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import FormReport from './components/FormReport';
import Navigation from '../../components/Navigation/Navigation'
import { putReport } from '../../api/services/reports';
import { getAllTaxonomies, getMinifiedTaxonomy } from "../../api/services/taxonomies";

const EditReport = () => {
  
    const location = useLocation();
    const fromState = location.state;
    const[body,setBody]=useState(fromState);
    const [taxonomies, setTaxonomies] = useState([])

    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    useEffect( ()=> {
        getMinifiedTaxonomy().then((response) => { 
            let listTaxonomies = []
            response.map((taxonomy) => {
                listTaxonomies.push({value:taxonomy.url, label:taxonomy.name})
            })
            setTaxonomies(listTaxonomies)
          })
          .catch((error) => {
            console.log(error)
              
          }).finally(() => {
              setLoading(false)
          })
        
      },[]);


    const resetShowAlert = () => {
        setShowAlert(false);
    }

    const editReport= ()=>{
        putReport(body.url, body.problem, body.derived_problem, body.verification, body.recommendations, body.more_information, body.lang, body.taxonomy)
        .then((response) => { 
            window.location.href = "/reports"
        })
        .catch((error) => {
            setShowAlert(true)
        })
       
    }
  return (
    <div>
        <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="report"/>
        <Row>
            <Navigation actualPosition="Editar reporte" path="/reports" index ="Reportes"/> 
        </Row>
    
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Editar reporte</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form>
                        <FormReport body={body} setBody={setBody} taxonomies={taxonomies} 
                        createOrEdit={editReport}/> 
                </Form>
                </Card.Body>
            </Card>
        
    </div>
  )
}

export default EditReport