import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import images from '../randomImages.json';
import { StyledApp } from './App.styled'
import LoadMoreBtn from './Button/Button';


class App extends Component {

  state = {
    searchQuery: '',
    isOpenLoader: true,
  }

  handlerInputValue = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  render() {

    return (
      <StyledApp >
        <Searchbar onInputChange={this.handlerInputValue} value={this.state.searchQuery} />
        <ImageGallery
          images={images}
        >

        </ImageGallery>
        <LoadMoreBtn />
        {this.state.isOpenLoader && <Loader />}
      </StyledApp>
    );
  }
};

export { App };
