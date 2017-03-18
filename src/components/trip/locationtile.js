import React from 'react';

export default props => (
     <div className="panel panel-info">
       <div className="panel-heading">
         <h3 className="panel-title">{`${props.name} - ${props.location}`}</h3>
       </div>
       <div className="panel-body">
         <div className="col-md-4">
           <img src={props.image} alt=''/>
         </div>
         <div className="col-md-8" style={{ wordWrap: 'break-word' }}>{props.tip}</div>
       </div>
     </div>
  );
