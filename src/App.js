import './App.css';
import './AppMediaQuery.css';
import React from 'react';
import Container from './components/Container';
import DatePicker from './components/DatePicker';
import Results from './components/Results';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayCount: 0,
            blurb: 'That\'s today!',
            opacifyResults: false,
        }
        this.calculateDays = this.calculateDays.bind(this);
    }

    calculateDays = (year, month, day, text) => {
        const today = new Date();
        const inputDate = new Date(year, month - 1, day);

        // number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // convert both days to milliseconds
        const today_ms = today.getTime();
        const inputDate_ms = inputDate.getTime();

        const difference_ms = Math.abs(today_ms - inputDate_ms);

        // convert back to days
        const dayCount = Math.round(difference_ms/ONE_DAY) - 1;

        this.setState({dayCount: dayCount, blurb: text});
    }

    setResultsOpacity = (arg) => {
        this.setState({opacifyResults: arg});
    }



    render(){
        return (
            <div className="App flex-column-center">
                <Container />
                <DatePicker calculateDays={this.calculateDays} setResultsOpacity={this.setResultsOpacity}/>
                <Results count={this.state.dayCount} blurb={this.state.blurb} opacify={this.state.opacifyResults}/>
            </div>
        );
    }
}

export default App;
