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

  //tmp
  const GeoJSONData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [-77.032, 38.913]},
        properties: {title: 'Mapbox', description: 'Washington, D.C.'}
      },
      {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [-122.414, 37.776]},
        properties: {title: 'Mapbox', description: 'San Francisco, California'}
      }
    ]
  };

  // No use for this yet but this runs each re-render, here for learning reminder purposes
  useEffect(()=>{console.log("Use Effect (AKA: re-render triggered)")})

  return (
    <div className="App">
      <header className="App-header"></header>
      <Container fluid>
      <h1>DPSS Data Dashboard</h1>
      <DataSelectForm setCrimeRecords={setCrimeRecords}/>
      <button onClick={pullData}>pull data</button>      
        <Row>
          <Col md={4} lg={4} xl={4}>
            <div id="sidebar">
            <p>Record Count : {crimeRecords.length}</p>
              {crimeRecords.map((record,key)=>{return(<Row key={key}><Incident incident={record}/></Row>)})}
            </div>
          </Col>
          <Col md={8} lg={8} xl={8} style={{backgroundColor:"red"}}>
            <Row> <Map geoJSData={GeoJSONData} incidentData={crimeRecords}/> </Row>
          </Col>
        </Row>
        

      </Container>

    </div>
  );
}

export default App;
