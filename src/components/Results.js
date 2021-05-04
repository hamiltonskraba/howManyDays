import React from 'react';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="resultsContainer flex-center">
                <div className="displayCount flex-center">{this.props.count}</div>
                <div className="unitSelection"></div>
            </div>
        )
    }
}

export default Results;
