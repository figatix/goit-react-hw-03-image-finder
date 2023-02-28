import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { StyledApp } from './App.styled'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {

  state = {
    fetchQuery: '',
  }

  onSubmitForm = (value) => {
    this.setState({ fetchQuery: value })
  }

  render() {
    // console.log('this.state.arr', this);
    return (
      <StyledApp >
        <Searchbar
          fetchQuery={this.state.fetchQuery}
          onSubmitForm={this.onSubmitForm}

        />
        <ImageGallery
          query={this.state.fetchQuery}
        >
        </ImageGallery>
        <ToastContainer autoClose={2000} />
      </StyledApp>
    );
  }
};

export { App };
