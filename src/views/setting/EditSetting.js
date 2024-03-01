import React, { useState, useEffect } from 'react';
import { Row, Card, Table, Form, Button,Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation';
import {  patchSetting, getSetting } from '../../api/services/setting';
import AdvancedPagination from '../../components/Pagination/AdvancedPagination';

const EditSetting = () => {
  const location = useLocation();
  const fromState = location.state;
  const [body, setBody] = useState(fromState);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [ifModify, setIfModify] = useState(null) 

  const [currentPage, setCurrentPage] = useState(1)
  const [countItems, setCountItems] = useState(0);
  const [updatePagination, setUpdatePagination] = useState(false)
  const [disabledPagination, setDisabledPagination] = useState(true)

  useEffect(() => {
    getSetting(currentPage)
      .then(response => {
        setList(response.data.results);
        setCountItems(response.data.count)
        if(currentPage === 1){
          setUpdatePagination(true)  
        }
        setDisabledPagination(false)
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ifModify, currentPage]);

  const resetShowAlert = () => {
    setShowAlert(false);
  };

  function updatePage(chosenPage){
    setCurrentPage(chosenPage);
  }

  // Function to remove a specific part of a URL
  function removePartOfURL(url) {
  // Using a regular expression to find and replace the part to remove
    var partToRemove = "/?page="+currentPage;
    return url.replace(new RegExp(partToRemove + '.*?(\/|$)'), '');
    
  }

  const PatchSetting = url => {
    // Aquí puedes implementar la lógica para enviar el patch request
    let item=list[list.findIndex(item => item.url === url)]
    console.log(removePartOfURL(url))

    patchSetting(url,  item.value)
    .then(response => setIfModify(response))
    .catch(error => console.log(error))
  };

  const completeField = (event, url) => {
    const newValue = event.target.value;
    const updatedList = list.map(item => {
      if (item.url === url) {
        return { ...item, value: newValue };
      }
      return item;
    });
    setList(updatedList);
  };

  return (
    <div>
      <Alert showAlert={showAlert} resetShowAlert={() => setShowAlert(false)} component="state" />
      <Row>
        <Navigation actualPosition="configuración" />
      </Row>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Configuracion del sistema</Card.Title>
        </Card.Header>
        <Card.Body>
          <ul className="list-group my-4">
            <Table responsive hover className="text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Valor</th>
                  <th>Modificar</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((setting, index) => (
                  <tr key={index}>
                    <td>{setting.key}</td>
                    <td>
                      <Form.Group controlId={`formGridAddress${index}`}>
                        <Form.Control
                          name="value"
                          value={setting.value}
                          maxLength="150"
                          placeholder="Ingrese el problema"
                          onChange={e => completeField(e, setting.url)}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Button variant="outline-warning" onClick={() => PatchSetting(setting.url)}>
                        Grabar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ul>
        </Card.Body>

        <Card.Footer >
            <Row className="justify-content-md-center">
                <Col md="auto"> 
                  <AdvancedPagination countItems={countItems} updatePage={updatePage} updatePagination={updatePagination} setUpdatePagination={setUpdatePagination} setLoading={setLoading} setDisabledPagination={setDisabledPagination} disabledPagination={disabledPagination}/>
                </Col>
            </Row>
          </Card.Footer>
      </Card>
    </div>
  );
};

export default EditSetting;
