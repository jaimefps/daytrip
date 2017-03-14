import React, { Component } from 'react';

export default props =>
  // console.log(JSON.stringify(props.place[0].photos, null, 2));
  // console.log(props.place[0].photos[2].getUrl({ maxWidth: 200, maxHeight: 200 }));
   (
     <div className="panel panel-info">
       <div className="panel-heading">
         <h3 className="panel-title">{`${props.name} - ${props.location}`}</h3>
       </div>
       <div className="panel-body">
         <div className="col-md-4">
           <img src={props.place[0].photos[0].getUrl({ maxWidth: 130, maxHeight: 130 })} />
         </div>
         <div className="col-md-8" style={{ wordWrap: 'break-word' }}>{props.tip}</div>
       </div>
     </div>
  );
