import React, { useEffect } from "react"
import {useState} from "react"

import axios from "axios"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


const DataSelectForm = (props) => {
  const [targetDate, setTargetDate] = useState("");
  const [targetEndDate, setEndDate] = useState("");
  const [addrContains, setAddrContains] = useState("");
  const [locContains, setLocContains] = useState("");
  const [descContains, setDescContains] = useState("");
  const [narrContains, setNarrContains] = useState("");

  const handleDataRequest = (event) => {
    event.preventDefault();
    /*
    console.log("Submit Registered && Reload Prevented");
    console.log(`StartDate :: ${targetDate}`);
    console.log(`EndDate :: ${targetEndDate}`);
    console.log(`AddrContains :: ${addrContains}`);
    console.log(`LocContains :: ${locContains}`);
    console.log(`DescContains :: ${descContains}`);
    console.log(`NarrContains :: ${narrContains}`);
    */
    console.log("PullForm")

    /*
    axios.get('http://localhost:3001/test').then(response=>{
      console.log(response.data);
      props.setCrimeRecords(response.data);
    })
    */
    if(targetDate){
      axios.get(`http://localhost:3001/getdate/${targetDate}`).then(response =>{
        console.log(response.data);
        props.setCrimeRecords(response.data);
      })
    }

    console.log("EndPullForm")
  }

  const changeDate = (event) => {
    //console.log(`Date Change :: ${event.target.value}`);
    //console.log("Change Date Triggered")
    setTargetDate(event.target.value);
    console.log("date",event.target.value)
    let endDateElem = document.getElementById("enterEndDate");
    //console.log(otherVar);
    endDateElem.min = event.target.value
    //console.log("====================")
  }

  const changeEndDate = (event) => {
    /* Add :: Some kind of logic to ensure end-date later than start-date */
    //console.log(`End-Date Change :: ${event.target.value}`);
    setEndDate(event.target.value);
    console.log("end_date",event.target.value)
  }

  const changeAddr = (event) => {
    //console.log(`Address Change :: ${event.target.value}`);
    //console.log(event)
    //console.log(event.target)
    //console.log(event.target.id)
    setAddrContains(event.target.value);
  }

  const changeLoc = (event) => {
    //console.log(`Location Change :: ${event.target.value}`);
    setLocContains(event.target.value);
  }

  const changeDesc = (event) => {
    //console.log(`Description Change :: ${event.target.value}`);
    setDescContains(event.target.value);
  }

  const changeNarr = (event) => {
    //console.log(`Narrative Change :: ${event.target.value}`);
    setNarrContains(event.target.value);
  }

  useEffect(()=>{
    /* We're setting the maximum date as current date to prevent future date lookup from being an option 
    There may be a better place to put these couple of lines, but for now, useEffect works fine */
    const enterDateElem = document.getElementById("enterDate")
    const enterEndDateElem = document.getElementById("enterEndDate")
    const today = new Date()
    enterDateElem.max = today.toISOString().split("T")[0]
    enterEndDateElem.max = today.toISOString().split("T")[0]
  })

  return(
    <Container>
      <form onSubmit={handleDataRequest} style={{"display":"table"}}>
        <Row>
          <Col><label>Start/Sole Date</label></Col>
          <Col><input id="enterDate" type="date" min="1999-12-30" onChange={changeDate}></input></Col>
          <Col><label>End Date (if range)</label></Col>
          <Col><input id="enterEndDate" type="date" min="1999-12-30" onChange={changeEndDate}></input></Col>
          <Col><label>Address Contains</label></Col>
          <Col><input id="enterAddr" onChange={changeAddr}></input></Col>
        </Row>

        <Row>
          <Col><label>Location Contains</label></Col>
          <Col><input id="enterLoc" onChange={changeLoc}></input></Col>
          <Col><label>Description Contains</label></Col>
          <Col><input id="enterDesc" onChange={changeDesc}></input></Col>
          <Col><label>Narrative Contains</label></Col>
          <Col><input id="enterNarr" onChange={changeNarr}></input></Col>
        </Row>

        <button onClick={handleDataRequest}>Pull Data From Form</button>
      </form>
    </Container>
  )
}

export default DataSelectForm