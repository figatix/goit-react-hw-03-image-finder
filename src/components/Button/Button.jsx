
import React, { Component } from 'react';
import { StyledButton } from './Button.styled';

export default class LoadMoreBtn extends Component {

  render() {
    const { onClick } = this.props

    return (
      <StyledButton onClick={onClick} type="button">Load more</StyledButton>
    )
  }

}

