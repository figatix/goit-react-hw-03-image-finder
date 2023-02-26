import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import images from '../randomImages.json';
import { StyledApp } from './App.styled'
import LoadMoreBtn from './Button/Button';
import Modal from './Modal';


class App extends Component {

  state = {
    searchQuery: '',
    isOpenLoader: true,
    isOpenModal: false,
    currentImg: null,
  }

  handlerInputValue = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  handlerCurrentImg = (id) => {
    const currImg = images.find(el => el.id === id)
    this.setState({
      currentImg: currImg,
      isOpenModal: true,
    })
  }

  onCloseModal = (e) => {

    if (e.code === "Escape") {
      this.setState({
        isOpenModal: false,
      })
    }

    if (e.target === e.currentTarget) {
      this.setState({
        isOpenModal: false,
      })
    }
  }

  render() {

    return (
      <StyledApp >
        <Searchbar onInputChange={this.handlerInputValue} value={this.state.searchQuery} />
        <ImageGallery images={images} onImgClick={this.handlerCurrentImg}>

        </ImageGallery>
        <LoadMoreBtn />
        {this.state.isOpenLoader && <Loader />}
        {this.state.isOpenModal && <Modal onCloseModal={this.onCloseModal} currentImg={this.state.currentImg} />}
      </StyledApp>
    );
  }

};

export { App };
