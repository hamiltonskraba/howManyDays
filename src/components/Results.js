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
                style={this.state.unit === el.value ? {backgroundColor: '#E38164', color: '#f5f5f5', border: '1px inset #e39449'} : null}
            >{el.label}</button>);

        return(
            <div className="results">
                <div className="resultsContainer flex-center">
                    <div className="displayCount flex-center" style={{opacity: this.props.opacify ? '70%' : '100%'}}>
                        {this.calculateUnit(this.props.count).toLocaleString()}
                        <div className="blurb">{this.props.blurb}</div>
                    </div>

                </div>
                <div className="unitButtonsContainer flex-center">
                    <div className="unitSelection">{units}</div>
                </div>
            </div>
        )
    }
}

export default Results;
