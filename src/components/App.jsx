import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem';
import images from '../randomImages.json';
import { StyledApp } from './App.styled'
import LoadMoreBtn from './Button/Button';


class App extends Component {

  state = {
    searchQuery: '',
    isOpenLoader: true,
    isOpenModal: true,
    currentImg: null,
  }

  handlerInputValue = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  handlerCurrentImg = (id) => {
    const currImg = images.find(el => el.id === id)
    console.log(currImg);
    this.setState({
      currentImg: currImg.srcOriginal
    }, () => { console.log('This state', this.state.currentImg) })

    console.log('This state', this.state.currentImg);
  }

  render() {

    return (
      <StyledApp >
        <Searchbar onInputChange={this.handlerInputValue} value={this.state.searchQuery} />
        <ImageGallery images={images} onImgClick={this.handlerCurrentImg}>

        </ImageGallery>
        <LoadMoreBtn />
        {this.state.isOpenLoader && <Loader />}
      </StyledApp>
    );
  }

};

export { App };
