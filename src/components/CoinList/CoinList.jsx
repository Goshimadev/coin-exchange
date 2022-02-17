import React from 'react';
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table `
    font-size: 1rem;
`

const TableClass = 'table table-hover table-primary table-bordered';

export default function CoinList(props) {

  return (
      <Table className={TableClass}>
      <thead>
        <tr>
          <th>Name</th> 
          <th>Ticker</th> 
          <th>Price</th>
          <th>Balance</th> 
          <th>Actions</th>  
        </tr>  
      </thead> 
      <tbody>
        {
          // we give the return value of this function in the Coin component 
          // each item needs a unique id, so we use ticker as each coin has a unique ticker 
          props.coinData.map( ({key, name, ticker, price, balance}) => 
            <Coin key={key}
            handleRefresh={props.handleRefresh}
            handleTransaction={props.handleTransaction}
            name={name} 
            ticker={ticker}
            showBalance={props.showBalance} 
            balance={balance} 
            price={price} 
            tickerId={key}/>
          )
        }
      </tbody> 
      </Table>
  )

}
