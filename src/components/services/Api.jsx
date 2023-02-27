import axios from "axios"


export const FetchQuery = (query) => {
  return fetch(`https://pixabay.com/api/?q=${query}&page=1&key=33045436-8e58141e6d6ddbbbde7b75c75&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
      if (!response.ok) {

        // return Promise.reject(
        //   new Error('Ойой..') 
        // )

        throw new Error(`I cant find some images by: ${query} `)
      }
      return response.json()
    })
}