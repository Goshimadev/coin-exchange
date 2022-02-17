import React from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div `
    text-align: center;
    background-color: rgb(20, 56, 97);
    color: #ccc;
`

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

class App extends React.Component {
  state = {
    // These are the states 
    balance: 10000,
    showBalance: true,
    coinData: [
      // we don't have this state anymore becuase we're querying the API
      /*
      {
        name: 'Bitcoin',
        ticker: 'BTC',
        balance: 0.5,
        price: 9999.99,
      },
      {
        name: 'Ethereum',
        ticker: 'ETH',
        balance: 32.0,
        price: 299.99,
      },
      {
        name: 'Tether',
        ticker: 'USDT',
        balance: 0,
        price: 1.0,
      },
      {
        name: 'Ripple',
        ticker: 'XRP',
        balance: 1000,
        price: 0.2,
      },
      {
        name: 'Bitcoin Cash',
        ticker: 'BCH',
        balance: 0,
        price: 298.99,
      }
      */
    ]
  }

  // These are the life cycles methods 
  componentDidMount = async () => {
    // here we load the data with axios 
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    // we use slice to limit our coins to the coin_count value
    const coinIds = response.data.slice(0, COIN_COUNT).map( coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key:    coin.id,
        name:   coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    })
    // retrieve the prices
    this.setState({ coinData: coinPriceData });
  }

  handleBalanceVisibilityChange = () => {
    this.setState( function(oldState) {
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    });
  }  

  // the method find will find us the price of the state we click
  handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = this.state.coinData.map( function ( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
      }
      return newValues;
    });

    this.setState( {coinData: newCoinData} );
  }

  render() {
      return (
        <Div>
          <Header />
          <AccountBalance amount={this.state.balance} 
          showBalance={this.state.showBalance} 
          handleBalanceVisibilityChange={this.handleBalanceVisibilityChange} />
          <CoinList coinData={this.state.coinData} 
          handleRefresh={this.handleRefresh} 
          showBalance={this.state.showBalance} />
        </Div>
      );
  }
}

export default App;
