
import React, { Component } from 'react'
import {
  StyledSearcbar,
  StyledSearchForm,
  StyledSearchFormBtn,
  StyledSearchFormBtnLabel,
  StyledSearchFormInput,
} from './Searchbar.styled'
// import { BiSearchAlt2 } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { SearchIcon } from './SearchIcon';


export default class Searchbar extends Component {

  state = {
    inputValue: '',
  }

  handlerInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const value = this.state.inputValue.toLowerCase().trim()
    if (!value) {
      toast.error('Empty input')
      return
    }
    if (this.props.fetchQuery === value) {
      toast.error('Enter new query')
      // this.props.onSubmitForm('')
      return
    }
    //
    this.props.onSubmitForm(value)
    // 
    // this.setState({
    //   inputValue: ''
    // })
  }

  render() {
    const { inputValue } = this.state;

    return (
      <StyledSearcbar>
        <StyledSearchForm onSubmit={this.onSubmit}>
          <StyledSearchFormBtn type="submit" aria-label='search button'>
            <SearchIcon />
            <StyledSearchFormBtnLabel>Search</StyledSearchFormBtnLabel>
          </StyledSearchFormBtn>

          <StyledSearchFormInput
            type="text"
            autoComplete="off"
            onChange={this.handlerInputValue}
            name="searchInput"
            value={inputValue}
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledSearchForm>
      </StyledSearcbar>
    )
  }
}


