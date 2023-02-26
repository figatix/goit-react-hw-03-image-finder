import ImageGalleryItem from 'components/ImageGalleryItem'
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import React, { Component } from 'react';
import { StyledImageGalley } from './ImageGallery.styled';


export default class ImageGallery extends Component {

  state = {
    queryResponse: {},
    queryHits: [],
    total: 0,
    totalHits: 0,
    status: 'idle',
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query
    const newQuery = this.props.query

    if (prevQuery !== newQuery) {
      console.log("BOOOOOO");
      this.setState({ status: 'pending' })

      fetch(`https://pixabay.com/api/?q=${newQuery}&page=1&key=33045436-8e58141e6d6ddbbbde7b75c75&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (!response.ok) {

            // return Promise.reject(
            //   new Error('Ойой..') 
            // )

            throw new Error('Ойой..')
          }

          return response.json()
        })
        .then(data => {
          console.log(data);
          return this.setState({
            queryResponse: data,
            queryHits: data.hits,
            total: data.total,
            totalHits: data.totalHits,
            status: 'resolve'
          })
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
    }
  }



  render() {
    // const { images } = this.props;
    const { queryHits } = this.state;
    console.log('STATE', this.state);

    return (
      <StyledImageGalley>
        {/* <!-- Набір <li> із чтандартними зображеннями --> */}
        {/* {
          images.map((img) => {
            return (
              <ImageGalleryItem
                src={img.srcSmall}
                srcOriginal={img.srcOriginal}
                alt={img.alt}
                key={img.id}
                id={img.id}
                images={images} />
            )
          })
        } */}

        {
          queryHits.map((img) => {
            return (
              <ImageGalleryItem
                src={img.previewURL}
                srcOriginal={img.pageURL}
                alt={img.tags}
                key={img.id}
                id={img.id}
                images={queryHits} />
            )
          })
        }

        {
          this.state.isLoading &&
          <Modal>
            <Loader />
          </Modal>
        }

      </StyledImageGalley>
    )
  }
}
