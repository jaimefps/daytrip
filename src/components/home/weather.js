import React, { Component } from 'react';

export default class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let { index } = this.state;
    e.target.name === 'prev' ? index-- : index++;
    index = Math.max(Math.min(index,9),0);
    this.setState({ index })
  }

  render() {
    const {data} = this.props;
    const {index} = this.state;
    if (!data.length) return <div> Loading.... </div>
    return (
      <div className="panel panel-default" style={{fontFamily: 'roboto'}}>
        <div className="panel-heading">
          <h3 className="panel-title">Forcecast - San Francisco, CA</h3>
        </div>
        <div className="panel-body">
          <div className="col-md-4 panelTop text-center">
            <img src={data[index].icon_url} /><p style={{marginBottom: '0px'}}/>
            <span>{data[index].conditions}</span>
          </div>
          <div className="col-md-4 panelTop text-center">
            <div style={{fontSize: '36px'}}>{data[index].high.fahrenheit}<sup>º</sup></div>
            <div style={{fontSize: '18px'}}>{data[index].low.fahrenheit}<sup>º</sup></div>
          </div>
          <div className="col-md-4 panelTop text-center">
            <img src="https://image.flaticon.com/icons/svg/56/56086.svg" style={{height:'50px', width:'50px'}}/><p style={{marginBottom: '0px'}}/>
            <span>{data[index].avewind.mph} mph {data[index].avewind.dir}</span>
          </div>
          <div className="col-md-12 panelBottom text-center" style={{marginTop: '10px'}}>
          <div style={{marginTop: '10px'}}>
            <button onClick={this.handleClick} name="prev" style={{marginRight: '10px'}} className="btn btn-default"><a style={{textDecoration: 'none'}} onClick={this.handleClick} name="prev" className="glyphicon glyphicon-arrow-left"></a></button>
            {data[index].date.weekday+ ', ' + data[index].date.pretty.slice(14)}
            <button onClick={this.handleClick} name="next" style={{marginLeft: '10px'}} className="btn btn-default"><a style={{textDecoration: 'none'}} onClick={this.handleClick} name="next" className="glyphicon glyphicon-arrow-right"></a></button>
          </div>
          </div>
          
        </div>
        
      </div>
    )
  }
}