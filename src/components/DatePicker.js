import React from 'react';
import {monthsMap, thirtyOneDays} from "../config/config";

class DatePicker extends React.Component {
    constructor(props){
        super(props);
        const [month, date, year]    = new Date().toLocaleDateString("en-US").split("/");
        this.state = {
            month: month,
            monthLabel: monthsMap.find(el => el.value === month).label,
            day: date,
            year: year,
            monthDisplay: false,
            dayDisplay: false,
            dayCount: null,
        }
        this.calculate = this.calculate.bind(this);
        this.setDate = this.setDate.bind(this);
        this.toggleMonths = this.toggleMonths.bind(this);
        this.toggleDays = this.toggleDays.bind(this);
    }


    calculate = () => {
        const today = new Date();
        console.log(today);

        const inputDate = new Date(this.state.year, this.state.month - 1, this.state.day);
        console.log(inputDate);

        // number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // convert both days to milliseconds
        const today_ms = today.getTime();
        const inputDate_ms = inputDate.getTime();

        const difference_ms = Math.abs(today_ms - inputDate_ms);

        // convert back to days
        const dayCount = Math.round(difference_ms/ONE_DAY);

        this.setState({dayCount: dayCount});
    }






    setDate(e){
        const key = e.target.attributes['datetype'].value;
        // console.log(key);
        this.setState({
            [key]: e.target.value,
            [`${key}Label`]: e.target.innerText,
            [`${key}Display`]: false,
        });
    }

    toggleMonths(){
        // console.log('called toggle months');
        this.setState({monthDisplay: !this.state.monthDisplay});
    }

    toggleDays(){
        this.setState({dayDisplay: !this.state.dayDisplay});
    }

    render(){
        // create the months list
        const months = monthsMap.map((el, idx) =>
            <button
                datetype="month"
                key={idx}
                value={el.value}
                onClick={this.setDate}
                className="buttonOptions"
                style={{display: el.label === this.state.monthLabel ? 'none' : 'block'}}
            >{el.label}</button>);

        // determine how many days to display based on month
        const dayCount = thirtyOneDays.includes(this.state.month.toString()) ? 31 : 30;

        let days = [];
        for(let i = 1; i <= dayCount; i++) {
            days.push(<button
                        datetype="day"
                        key={i}
                        value={i}
                        onClick={this.setDate}
                        >{i}</button>);
        }

        return(
            <div className="dateContainer flex-center">
                <div className="inputGroup flex-center">
                    <div className="monthGroup" onClick={this.toggleMonths}>
                        {this.state.monthLabel}
                        <span style={{display: this.state.monthDisplay ? 'flex' : 'none'}} className="monthList">
                            {months}
                        </span>
                    </div>
                    <div className="dayGroup" onClick={this.toggleDays}>
                        {this.state.day}
                        <span style={{display: this.state.dayDisplay ? 'flex' : 'none'}} className="daysList">
                            {days}
                        </span>
                    </div>
                    <div className="yearGroup">
                        <input type="text" value={this.state.year} onChange={this.setDate} datetype="year"/>
                    </div>
                </div>
                <button className="submitButton" onClick={this.calculate}>Tell Me</button>
                <div className="dayCount">{this.state.dayCount}</div>
            </div>
        );
    }
}

export default DatePicker;
