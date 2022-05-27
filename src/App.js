/* Baseline Imports */
import axios from "axios"
import {useState, useEffect} from "react"

/* Custom Components */
import DataSelectForm from "./components/DataSelectForm"
import Incident from "./components/Incident"
import Map from "./components/Map"

/* Bootstrap-isms */
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const App = () => {
  const [crimeRecords, setCrimeRecords] = useState([]);

  const pullData = () => {
    axios.get('http://localhost:3001/test').then(response=>{
      console.log(response.data);
      setCrimeRecords(response.data);
    })
  }

  // No use for this yet but this runs each re-render, here for learning reminder purposes
  useEffect(()=>{console.log("Use Effect (AKA: re-render triggered)")})

  return (
    <div className="App">
      <header className="App-header"></header>
      <Container fluid>
      <h1>DPSS Data Dashboard</h1>
      <DataSelectForm setCrimeRecords={setCrimeRecords}/>
        <Row>
          <Col md={4} lg={4} xl={4}>
            <div id="sidebar">
            <p>Record Count : {crimeRecords.length}</p>
              {crimeRecords.map((record,key)=>{return(<Row key={key}><Incident incident={record}/></Row>)})}
            </div>
          </Col>
          <Col md={8} lg={8} xl={8} style={{backgroundColor:"red"}}>
            <Row> <Map incidentData={crimeRecords}/> </Row>
          </Col>
        </Row>
        

      </Container>

    </div>
  );
}

export default App;
