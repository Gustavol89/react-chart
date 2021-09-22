import React from 'react';
import Plot from 'react-plotly.js';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],             stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointertothis = this;
        const API_KEY = ''; //IN HERE YOU CAN PUT YOUR TOKEN
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED
        &symbol=NVDA&outputsize=full&apikey=${API_KEY}`
        let stockChartXValuesFunction = []; 
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return (response.json())
                }
            )
            .then(
                function (data) {
                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)']
                        [key]['4. close'])
                    }

                    pointertothis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                    })
                }

            )

    }
   
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: '#737373',}
                        },
                        { type: 'Line' },
                    ]}
                    layout={{ width: 700, height: 500, title: 'Nvidia Corporation' }}
                />

            </div>
        )
    }
}
export default Chart