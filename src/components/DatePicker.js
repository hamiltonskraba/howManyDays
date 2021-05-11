import React from 'react';
import {monthsMap, thirtyOneDays, historyMap} from "../config/config";

class DatePicker extends React.Component {
    constructor(props){
        super(props);
        const [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
        this.state = {
            month: month,
            monthLabel: monthsMap.find(el => el.value === month).label,
            day: date,
            year: year,
            monthDisplay: false,
            dayDisplay: false,
            isLeap: false,
        }
        this.setDate = this.setDate.bind(this);
        this.toggleMonths = this.toggleMonths.bind(this);
        this.toggleDays = this.toggleDays.bind(this);
        this.checkYear = this.checkYear.bind(this);
        this.toggleBoth = this.toggleBoth.bind(this);
        this.dayInHistory = this.dayInHistory.bind(this);
    }

    calculate  = (blurb) => {
        const text = typeof blurb === 'object' ? null : blurb;
        this.props.calculateDays(this.state.year, this.state.month, this.state.day, text);
        this.setState({monthDisplay: false, dayDisplay: false});
    }

    setDate(e){
        const key = e.target.attributes['datetype'].value;

        this.setState({
            [key]: e.target.value,
            [`${key}Label`]: e.target.innerText,
            [`${key}Display`]: false,
        });
    }

    toggleMonths(){
        // console.log('called toggle months');
        this.setState({monthDisplay: !this.state.monthDisplay, dayDisplay: false});
    }

    toggleDays(){
        this.setState({dayDisplay: !this.state.dayDisplay, monthDisplay: false});
    }

    toggleBoth(){
        this.setState({monthDisplay: false, dayDisplay: false});
    }

    checkYear(e){
        const year = e.target.value;

        let isLeapYear = false;
        if ( year > 1581 && year % 4 === 0){
            isLeapYear = true;
            if (year % 100 === 0) {
                isLeapYear = false;
                if (year % 400 === 0) {
                    isLeapYear = true;
                }
            }
        }

        this.setDate(e);

        this.setState({
            monthDisplay: false,
            dayDisplay: false,
            isLeap: isLeapYear,
        });
    }

    dayInHistory(){
        const random = Math.floor(Math.random() * historyMap.length);
        // console.log(random);

        const [month, date, year] = historyMap[random].value.split("/");
        const blurb = historyMap[random].label;
        this.setState({
            month: month,
            monthLabel: monthsMap.find(el => el.value === month).label,
            year: year,
            day: date,
        }, () => this.calculate(blurb));
    }

    render(){
        // create the months list
        const months = monthsMap.map((el, idx) =>
            <button
                datetype="month"
                key={idx}
                value={el.value}
                onClick={this.setDate}
                className="buttonOptions hoverPointer"
                style={{display: el.label === this.state.monthLabel ? 'none' : 'block'}}
            >{el.label}</button>);

        // determine how many days to display based on month
        const dayCount = this.state.month === '2' ? (this.state.isLeap ? 29 : 28) : (thirtyOneDays.includes(this.state.month.toString()) ? 31 : 30);

        let days = [];
        for(let i = 1; i <= dayCount; i++) {
            days.push(<button
                        datetype="day"
                        key={i}
                        value={i}
                        className="hoverPointer"
                        onClick={this.setDate}
                        >{i}</button>);
        }

        return(
            <div className="dateContainer flex-center">
                <div className="userChoice flex-center">
                    <div className="inputGroup flex-center">
                        <div className="monthGroup hoverPointer" onClick={this.toggleMonths}>
                            {this.state.monthLabel}
                            <span style={{display: this.state.monthDisplay ? 'flex' : 'none'}} className="monthList">
                                {months}
                            </span>
                        </div>
                        <div className="dayGroup hoverPointer" onClick={this.toggleDays}>
                            {this.state.day}
                            <span style={{display: this.state.dayDisplay ? 'flex' : 'none'}} className="daysList">
                                {days}
                            </span>
                        </div>
                        <div className="yearGroup hoverPointer">
                            <input className="hoverPointer" type="text" value={this.state.year} onChange={this.checkYear} onClick={this.toggleBoth} datetype="year" />
                        </div>
                    </div>
                    <button className="submitButton hoverPointer" onClick={this.calculate}>Tell Me</button>
                </div>
                <button className="randomDateButton hoverPointer" onClick={this.dayInHistory}>Choose An Important Date</button>
            </div>
        );
    }
}

export default DatePicker;
