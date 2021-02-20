import './App.css';
import React from 'react';
import Container from './components/Container';
import DatePicker from './components/DatePicker';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="App">
                <Container />
                <DatePicker />
            </div>
        );
    }
}

export default App;
