import React, { Component } from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table `
    margin: 50px auto;
    display: inline-block;
    font-size: 1.4rem;
`

export default class CoinList extends Component {
  render() {
    return (
        <Table>
        <thead>
          <tr>
            <th>Name</th> 
            <th>Ticker</th> 
            <th>Price</th>
            {this.props.showBalance ? <th>Balance</th> : null} 
            <th>Actions</th>  
          </tr>  
        </thead> 
        <tbody>
          {
            // we give the return value of this functino is the component Coin 
            // each item needs a unique id, so we use ticker as each coin has a unique ticker 
            this.props.coinData.map( ({key, name, ticker, price, balance}) => 
              <Coin key={key}
              handleRefresh={this.props.handleRefresh}
              name={name} 
              ticker={ticker}
              showBalance={this.props.showBalance} 
              balance={balance} 
              price={price} 
              tickerId={key}/>
            )
          }
        </tbody> 
        </Table>
    )
  }
}
