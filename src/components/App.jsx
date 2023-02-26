import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import images from '../randomImages.json';
import { StyledApp } from './App.styled'
import LoadMoreBtn from './Button/Button';
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

    return (
      <StyledApp >
        <Searchbar
          onSubmitForm={this.onSubmitForm}
        />
        <ImageGallery
          images={images}
          query={this.state.fetchQuery}
        >

        </ImageGallery>
        <LoadMoreBtn />
        {/* {this.state.isOpenLoader && <Loader />} */}
        <ToastContainer autoClose={2000} />
      </StyledApp>
    );
  }
};

export { App };
