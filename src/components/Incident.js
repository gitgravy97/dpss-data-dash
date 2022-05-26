import React from 'react'

const Incident = ({incident}) => {
    // Note that records before a __ year have no lat/long
    // how are we gonna handle those in mapping? db the addresses and google search it up?    
    return(
      <div style={{border: "1px solid"}}>
        <ul>
          <li>ID :: {incident.id}</li>
          <li>Date :: {incident.date} :: {incident.isoDate}</li>
          <li>Description :: {incident.description ? incident.description : "N/A"}</li>
          <li>Disposition :: {incident.disposition ? incident.disposition : "N/A"}</li>
          <li>Location :: {incident.location ? incident.location : "N/A"}</li>
          <li>Address :: {incident.address ? incident.address : "N/A"}</li>
          <li>Narrative :: {incident.narrative ? incident.narrative : "N/A"}</li>
          <li>Status :: {incident.status ? incident.status : "N/A"}</li>
          <li>Lat/Long :: ({incident.latitude ? <>{incident.latitude},{incident.longitude}</> : "N/A"})</li>
        </ul>
      </div>
    )
  }

export default Incident