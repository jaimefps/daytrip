import React from 'react';

export default props => (
  <div className="col-md-12">
    <div className="panel panel-default panel--styled">
      <div className="panel-body">
        <div className="col-md-12 panelTop">
          <div className="col-md-4">
            <img className="img-responsive" src={props.image} alt="" />
          </div>
          <div className="col-md-8">
            <h2 style={{ marginTop: '0px' }}>{props.name}</h2>
            <h4><p style={{ marginBottom: '0px', textDecoration: 'underline' }}> Address: </p>{props.location}</h4>
            <h4><p style={{ marginBottom: '0px', textDecoration: 'underline' }}>Tips: </p>{props.tip}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
