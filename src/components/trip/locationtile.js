import React from 'react';

export default props => (
          <div className="col-md-12">        
            <div className="panel panel-default panel--styled">
              <div className="panel-body">
                <div className="col-md-12 panelTop">  
                  <div className="col-md-4">  
                    <img className="img-responsive" src={props.image} alt=""/>
                  </div>
                  <div className="col-md-8">  
                    <h2>{props.name}</h2>
                    <p>{props.location}</p>
                    <p>{props.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
