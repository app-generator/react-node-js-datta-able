import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getAllStates } from '../../api/services/states';
import Alert from '../../components/Alert/Alert';
import { useTranslation, Trans } from 'react-i18next';

const CreateCase = () => {
        
    //Alert
    const [showAlert, setShowAlert] = useState(false);
    const [allStates, setAllStates] = useState([]) //multiselect

    const caseItem = {
        lifecycle: '',//required
        priority: '', //required
        tlp: '', //required
        state: '', //required
        date: null, //required
        name: "",
        parent: null,
        assigned: null,
        attend_date: null, //imprime la hora actual +3horas
        solve_date: null,
        comments: [], //?
        evidence: [],
    }

    useEffect(()=> {

        getAllStates()
            .then((response) => {
                console.log(response);
                let listStates = []
                response.map((stateItem)=>{
                    listStates.push({value:stateItem.url, label:stateItem.name, childrenUrl:stateItem.children})
                })
                setAllStates(listStates)
            })
            .catch((error)=>{
                console.log(error)
            })

        },[])

    const { t } = useTranslation();

    return (
        <React.Fragment>
            
            <Row>
                <Navigation actualPosition={t('Crear caso')} path="/cases" index ="Casos"/>
            </Row>
            <FormCase caseItem={caseItem} allStates={allStates} edit={false} save='Crear'/>
        </React.Fragment>
    );
};

export default CreateCase;
