import React, {useState, useEffect} from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import styled from 'styled-components';
import axios from 'axios';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';

const Div = styled.div `
    text-align: center;
    background-color: rgb(20, 56, 97);
    color: #ccc;
`
const P = styled.p`
    text-align: center;
    margin: 2rem auto;
`

const A = styled.a`
text-decoration: none;
`

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {

  // the states provide values anywhere in the application 
  // we initialize the values with useState - and can set new ones with (setName) 
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  // These are the life cycles methods 
  const componentDidMount = async () => {
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
        max_supply: coin.max_supply,
        rank: coin.rank,
        price: formatPrice(coin.quotes.USD.price),
      };
    })
    // retrieve the prices
    setCoinData(coinPriceData);
  }

  useEffect(() => {
    // here we have no data yet so we do component did mount
    // if we have data we update 
    if (coinData.length === 0) {
      componentDidMount();
    }
  });

  const handleBrrr = () => {
    setBalance(oldBalance => oldBalance + 1200);
  }

  const handleTransaction = (isBuy, valueChangeId) => {
    var balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function(values) {
      let newValues = {...values};
      if ( valueChangeId === values.key) {
        newValues.balance += balanceChange;
        setBalance( oldBalance => oldBalance - balanceChange * newValues.price );
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }

  const handleBalanceVisibilityChange = () => {
    // we're negating the old value
    // if it was false is gonna be true, if it was true is gonna be false
    setShowBalance(oldValue => !oldValue);
  }  

  // the method find will find us the price of the state we click
  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function ( values ) {
      // {...values} - this clones the original data
      //enumerates the old state (values)
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
      }
      return newValues;
    });

    setCoinData(newCoinData);
  }

  // here we're passing our functions 
  // we write the function with the function itself
  return (
    <>
    <Div>
      <Header />
      <AccountBalance amount={balance} 
      showBalance={showBalance}
      handleBrrr={handleBrrr} 
      handleBalanceVisibilityChange={handleBalanceVisibilityChange} />
      <CoinList coinData={coinData} 
      handleRefresh={handleRefresh} 
      handleTransaction={handleTransaction}
      showBalance={showBalance} />
      <div>
      <P>Powered by <A href='https://api.coinpaprika.com/' target='_blank'>Coinpaprika</A></P>
      <P>© 2022 - Designed by: <A href='https://github.com/ok-diego' target='_blank'>Diego Patino</A></P>
      </div>
    </Div>
    </>
  );
}

export default App;
