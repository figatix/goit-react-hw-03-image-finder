import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { StyledApp } from './App.styled'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from './services/Api';

const PER_PAGE = 12

class App extends Component {

  state = {
    query: '',
    queryHits: [],
    totalHits: 0,
    status: 'idle',
    error: null,
    page: 1,
    isLoading: false,
  }

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    const isQueryChanged = prevState.query !== query;
    const isPageChanged = prevState.page !== page;


    if (isPageChanged || isQueryChanged) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page, query } = this.state;

    this.setState({ isLoading: true })

    try {
      const { hits, totalHits } = await getImages(query, page)

      if (totalHits === 0) {
        toast.error(`Oops... We can't find ${query}`)
        return this.setState({
          status: 'idle',
          totalHits: 0,
          page: 1,
        })
      }

      if (page === 1) {
        this.setState({
          queryHits: hits,
          totalHits,
        })
      } else {
        this.setState((prevState) => ({
          queryHits: [...prevState.queryHits, ...hits],
          totalHits,
        }))
      }

    } catch (error) {
      toast.error(error.message)
      this.setState({ error, status: 'rejected' })
    } finally {
      this.setState({ isLoading: false }
        , () => {
          if (this.state.page !== 1) {
            this.scroll();
          }
        }
      );
    }
  }

  onSubmitForm = (value) => {
    this.setState({
      query: value,
      queryHits: [],
      totalHits: 0,
      page: 1,
      error: null
    })
  }

  handleMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild?.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  }

  render() {
    const { query, queryHits, status, error, totalHits, isLoading, page } = this.state;
    const isLoadMoreVisible = queryHits.length < totalHits && (page < Math.ceil(totalHits / PER_PAGE));

    return (
      <StyledApp >
        <Searchbar
          query={query}
          onSubmitForm={this.onSubmitForm}

        />
        <ImageGallery
          queryHits={queryHits}
          status={status}
          error={error}
          isLoading={isLoading}
          isLoadMoreVisible={isLoadMoreVisible}
          handleMoreBtnClick={this.handleMoreBtnClick}
        >
        </ImageGallery>
        <ToastContainer autoClose={2000} />
      </StyledApp >
    );
  }
};

export { App };
