import React from 'react';
import {monthsMap} from "../config/config";

class DatePicker extends React.Component {
    constructor(props){
        super(props);
        const [month, date, year]    = new Date().toLocaleDateString("en-US").split("/");
        this.state = {
            month: month,
            monthLabel: monthsMap.find(el => el.value === month).label,
            day: date,
            year: year,
            display: false,
        }
        this.calculate = this.calculate.bind(this);
        this.setDate = this.setDate.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
    }

    calculate(){
        alert('calculating....');
    }

    setDate(e){
        const key = e.target.attributes['dateType'].value;
        this.setState({
            [key]: e.target.value,
            [`${key}Label`]: e.target.innerText,
            display: false,
        });
    }

    toggleOptions(){
        this.setState({display: !this.state.display});
    }

    render(){
        const months = monthsMap.map((el, idx) =>
            <button
                dateType="month"
                key={idx}
                value={el.value}
                onClick={this.setDate}
                className="buttonOptions"
                style={{display: el.label === this.state.monthLabel ? 'none' : 'block'}}
            >{el.label}</button>);

        let daysArray = 12;

        return(
            <div className="dateContainer flex-center">
                <div className="inputGroup flex-center">
                    <div className="monthGroup" onClick={this.toggleOptions}>
                        {this.state.monthLabel}
                        <span style={{display: this.state.display ? 'flex' : 'none'}} className="monthList">
                            {months}
                        </span>
                    </div>
                    <div className="dayGroup">
                        {this.state.day}
                    </div>
                    <div className="yearGroup">
                        <input type="text" placeholder={this.state.year}/>
                    </div>
                </div>
                <button className="submitButton" onClick={this.calculate}>Tell Me</button>
            </div>
        );
    }
}

export default DatePicker;
