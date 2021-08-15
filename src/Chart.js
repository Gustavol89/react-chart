import React from 'react';
import Plot from 'react-plotly.js';

//CRIANDO CLASSE PARA IMPLEMENTAR O GRAFICO

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [], //CRIANDO UM ARRAY PARA ATRIBUIR OS VALORES X E Y DO GRAFICO
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    //EU ESTAVA TENDO ALGUMAS DIFICULDADES PARA IMPLEMENTAR A IEX CLOUD API ENTÃO ESTOU USANDO A ALPHA VANTAGE 

    fetchStock() {
        const pointertothis = this;
        const API_KEY = 'AYGKGOSQ68OJ9LJU';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=NVDA&outputsize=full&apikey=${API_KEY}`
        let stockChartXValuesFunction = []; //CRIANDO UMA FUNÇÃO PARA RECEBER OS VALORES DA API NO GRAFICO X E Y
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
    //EU TENTEI AQUI FAZER UM GRAFICO MAIS BONITO TENTEI USAR POR EX: RECHARTS E GOOGLE CHARTS POREM NÃO DEU CERTO 
    // ESSE REACT-PLOTY FOI O UNICO QUE EU CONSEGUI USAR

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