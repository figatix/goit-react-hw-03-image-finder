import LoadMoreBtn from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem'
import Loader from 'components/Loader';
import { FetchQuery } from 'components/services/Api';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledImageGallery } from './ImageGallery.styled';



export default class ImageGallery extends Component {

  state = {
    queryResponse: {},
    queryHits: [],
    total: 0,
    totalHits: 0,
    status: 'idle',
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query
    const newQuery = this.props.query

    if (prevQuery !== newQuery) {
      console.log("BOOOOOO", newQuery);
      this.setState({ status: 'pending' })

      FetchQuery(newQuery)
        .then(data => {

          if (data.totalHits === 0) {
            toast.error(`Oops... We don't find anything..`)
            return this.setState({ status: 'idle' })
          }

          return this.setState({
            queryResponse: data,
            queryHits: data.hits,
            total: data.total,
            totalHits: data.totalHits,
            status: 'resolved'
          })
        })
        .catch(error => {
          toast.error(error.message)
          return this.setState({ error, status: 'rejected' })
        })
    }
  }


  render() {
    const { queryHits, status, error, totalHits } = this.state;
    console.log('STATE', this.state);

    if (status === 'idle') {
      return <div>Enter your query</div>
    }

    if (status === 'pending') {
      return <Loader />
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>
    }

    if (status === 'resolved') {
      return (
        <>

          <StyledImageGallery>
            {totalHits !== 0 &&
              queryHits.map((img) => {
                return (
                  <ImageGalleryItem
                    src={img.previewURL}
                    srcOriginal={img.largeImageURL}
                    alt={img.tags}
                    key={img.id}
                    id={img.id}
                    images={queryHits} />
                )
              })
            }
          </StyledImageGallery>

          {totalHits > 12 && <LoadMoreBtn />}
        </>
      )
    }

  }
}
