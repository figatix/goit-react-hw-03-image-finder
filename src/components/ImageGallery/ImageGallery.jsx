import LoadMoreBtn from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem'
import Loader from 'components/Loader';
import { getImages } from 'components/services/Api';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledImageGallery } from './ImageGallery.styled';



export default class ImageGallery extends Component {

  state = {
    queryHits: [],
    totalHits: 0,
    status: 'idle',
    error: null,
    page: 1,
    isLoading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, } = this.props;
    const { page } = this.state;
    const isQueryChanged = prevProps.query !== query;
    const isPageChanged = prevState.page !== page;

    if (isQueryChanged) {
      this.setState({
        queryHits: [],
        page: 1,
        error: null
      })
      /*
        ! Після нового запиту, або зміни сторінки викликається КДА = який змінює стейт/
        ? ПИТАННЯ в тому, Чому коли я при новому запиті змінюю Пейдж на 1, Відбувається скрол?
         при цьому у Фетчі у файналі стоїть умова, яка викликає функцію скролу тільки коли Пейдж !==1.
         Напевно десь проблема з чергою викликів, або ще щось..
      */
    }
    console.log("PAGE, into CDU", page);

    if (isQueryChanged || isPageChanged) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page } = this.state;
    const { query } = this.props;

    this.setState({ isLoading: true })
    /* ? Чомусь, коли робиш через статус = масив заново відмальовується, а не додається в кінець 
      ! Тому що коли змінюєш статус = 
        викликається компонентДідАпдейт =
        Резолв -прибирається (розмітка пропадає, бо за умовою, розмітка малюється коли статус Резолвд), вішається статус Пендінг (Якщо для пендінга прописана умоав в рендері - відмальовується) =
        Відбувається запит за АПІ = Ставиться статус Резолвд або Реджектет = Відмальовується нова розмінтка(Виконалась умова в Рендері).
        Тому і відбувається перерендер всього Блоку.
        
        Тому ми використовуєм ісЛоадінг, який не прив'язаний до зміни загальної розмітки.
    */
    // this.setState({ status: 'pending' })

    try {
      const { hits, totalHits } = await getImages(query, page)

      if (totalHits === 0) {
        toast.error(`Oops... We can't find ${this.props.query} `)
        return this.setState({
          status: 'idle',
          // 
          totalHits: 0,
          page: 1,
        })
        // 
      }

      this.setState((prevState) => ({
        queryHits: [...prevState.queryHits, ...hits],
        totalHits,
        status: 'resolved'
        // 
      }))
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
    /* 
        ? Коли увів нормальний запит = натиснув ЛоадМоре =
        Увів невалідний запит =
        Ломається все!

        Ця проблема пов'язана з тим, що йде прокрутка при новому валідному запиті.

        типу: (увів нормальний запит = натиснув ЛоадМоре =
        Увів Валідний запит =
        прокрутка!)

      */
  }

  handleMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  }

  render() {
    const { queryHits, status, error, totalHits, isLoading, page } = this.state;
    console.log('STATE', this.state);

    const isLoadMoreVisible =
      (totalHits > 12) && (page < Math.ceil(totalHits / 12));

    // if (status === 'idle') {
    //   return <div style={{ marginInline: "auto" }} >Enter your query</div>
    // }

    // if (status === 'pending') {
    //   return <Loader />
    // }

    if (status === 'rejected') {
      return <div>{error.message}</div>
    }

    // if (status === 'resolved') {
    // 
    const galleryItems = queryHits.map(img => (
      <ImageGalleryItem
        key={img.id}
        id={img.id}
        src={img.webformatURL}
        srcOriginal={img.largeImageURL}
        alt={img.tags}
        images={queryHits}
      />
    ));
    return (
      <>

        <StyledImageGallery className='gallery' >
          {galleryItems}
        </StyledImageGallery>

        {isLoading && <Loader />}
        {/*
            ? Лоадер не вмикається при першому пошуку = бо статус ще не Резолвд, а Ідл. а ми знаходтмся в умові для резолвда. І виконуємось тільки коли статус резолвд . дилемка..
      */}
        {isLoadMoreVisible && <LoadMoreBtn onClick={this.handleMoreBtnClick} />}
      </>
    )
    // }

  }
}
