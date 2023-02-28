import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
// import images from '../randomImages.json';
import { StyledApp } from './App.styled'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {

  state = {
    fetchQuery: '',
  }

  // componentDidUpdate(prevProps, prevState){
    
  //   const prevQuery = prevState.fetchQuery
  //   const newQuery = this.state.fetchQuery

  //   if(prevQuery===newQuery){
  //     console.log('The same query');
  //   }
  // }

  onSubmitForm = (value) => {
    this.setState({ fetchQuery: value })
  }

  render() {

    return (
      <StyledApp >
        <Searchbar
          fetchQuery={this.state.fetchQuery}
          onSubmitForm={this.onSubmitForm}
        />
        <ImageGallery 
          // images={images}
          query={this.state.fetchQuery}
        >
        </ImageGallery>
        <ToastContainer autoClose={2000} />
      </StyledApp>
    );
  }
};

export { App };
