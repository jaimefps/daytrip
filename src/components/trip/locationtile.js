import React from 'react';

export default props => (
          <div className="col-md-12">        
            <div className="panel panel-default panel--styled">
              <div className="panel-body">
                <div className="col-md-12 panelTop">  
                  <div className="col-md-3">  
                    <img className="img-responsive" src={props.image} alt=""/>
                  </div>
                  <div className="col-md-9">  
                    <h2 style={{marginTop:'0px'}}>{props.name}</h2>
                    <p><h4 style={{marginBottom:'0px'}}>Address: </h4>{props.location}</p>
                    <p><h4 style={{marginBottom:'0px'}}>Tips: </h4>{props.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
