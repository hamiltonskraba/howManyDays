import './App.css';
import React from 'react';
import Container from './components/Container';
import DatePicker from './components/DatePicker';
import Results from './components/Results';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayCount: 0,
        }
        this.calculateDays = this.calculateDays.bind(this);
    }

    calculateDays = (year, month, day) => {
        const today = new Date();
        console.log(today);

        const inputDate = new Date(year, month - 1, day);
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

    render(){
        return (
            <div className="App">
                <Container />
                <DatePicker calculateDays={this.calculateDays}/>
                <Results count={this.state.dayCount}/>
            </div>
        );
    }
}

export default App;
