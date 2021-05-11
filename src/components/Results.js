import React from 'react';
import {unitsMap} from "../config/config";

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: 'days',
        }
        this.calculateUnit = this.calculateUnit.bind(this);
        this.setUnit = this.setUnit.bind(this);
    }

    setUnit(e) {
        this.setState({unit: e.target.value});
    }

    calculateUnit = (count) => {
        switch(this.state.unit) {
            case "days":
                return count;
            case "hours":
                return count * 24;
            case "minutes":
                return count * 24 * 60;
            case "seconds":
                return count * 24 * 60 * 60;
            default:
                return count + 10;
        }
    }

    render(){
        const units = unitsMap.map((el, idx) =>
            <button
                value={el.value}
                key={idx}
                onClick={this.setUnit}
                className="unitButton hoverPointer"
            >{el.label}</button>);

        return(
            <div className="resultsContainer flex-center">
                <div className="displayCount flex-center">
                    {this.calculateUnit(this.props.count)}
                    <div>{this.props.blurb}</div>
                </div>
                <div className="unitSelection">{units}</div>
            </div>
        )
    }
}

export default Results;
