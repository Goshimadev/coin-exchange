import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// we can use any name here and replace the html tag with it 
const Section = styled.section `
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin: 30px auto 0 30px;
    font-size: 1.7rem;
    font-weight: 400;
`

const Button = styled.button `
    color: #282c34;;
`

export default class AccountBalance extends Component {

  render() {
    const buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance'

    let content = null;
    if ( this.props.showBalance ) {
      content = <>Balance: ${this.props.amount}</>
    }

    return (
        <Section>
            {content}
            <Button onClick={this.handleBalanceVisibilityChange}>{buttonText}</Button>
        </Section>
    );      
  }
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}