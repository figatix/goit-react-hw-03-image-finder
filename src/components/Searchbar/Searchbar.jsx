
import React, { Component } from 'react'
import {
  StyledSearcbar,
  StyledSearchForm,
  StyledSearchFormBtn,
  StyledSearchFormBtnLabel,
  StyledSearchFormInput,
} from './Searchbar.styled'

export default class Searchbar extends Component {

  render() {
    const { onInputChange, value } = this.props;

    return (
      <StyledSearcbar>
        <StyledSearchForm>
          <StyledSearchFormBtn type="submit" aria-label='search button'>
            <StyledSearchFormBtnLabel>Search</StyledSearchFormBtnLabel>
          </StyledSearchFormBtn>

          <StyledSearchFormInput
            type="text"
            autoComplete="off"
            onChange={onInputChange}
            value={value}
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledSearchForm>
      </StyledSearcbar>
    )
  }
}



