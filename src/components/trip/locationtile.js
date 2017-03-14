import React, { Component } from 'react';

export default (props) => {
  // console.log(JSON.stringify(props.place[0].photos, null, 2));
  console.log(props.place[0].photos[2].getUrl({maxWidth:200, maxHeight:200}));
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{`${props.name} - ${props.location}`}</h3>
      </div>
    <div className="panel-body"> 
      <div className="col-md-3">
        <img src={props.place[0].photos[0].getUrl({maxWidth:200, maxHeight:200})} /> 
      </div>
      <div className="col-md-9">
        
      </div>
    </div>
    </div> 
  )
}