import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


// we can use any name here and replace the html tag with it 
const Section = styled.section`
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 3rem;
    text-align: center;
    margin: 1rem 0 2rem 0;
    display: inline-block;
`
const Balance = styled.div`
    min-width: 250px;
    margin: 2rem 0 0 0;
    font-size: 1.8em;
    font-weight: 400;
    vertical-align: middle;
    text-align: center;
`
const Button = styled.button`
    margin: 0 8px;;
    font-size: 1.2rem;
`
// we can copy the parent element style by adding it in ()s
const BalanceToggleButton = styled(Button)`
    width: 150px;
`

var formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function AccountBalance(props) {

  const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance'
  let content = '\u00A0';
  // In bootstrap we select buttons with the 'btn' class
  const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
  if ( props.showBalance ) {
    content = <>{ formatter.format(props.amount) }</>
  }

  return (
      <>  
        <Balance>{content}</Balance> 
        <Section>
            <BalanceToggleButton 
            onClick={props.handleBalanceVisibilityChange}
            className={buttonClass}>
            {buttonText}
            </BalanceToggleButton>
            <Button className='btn btn-success' 
            // since the setBalance state we need is in App.js we use props to create 
            // the function handleBrrr, which we will write in App.js
                    onClick={props.handleBrrr}>
                <i className='fas fa-helicopter'></i>
            </Button>
        </Section>
      </>  
  );      

}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}