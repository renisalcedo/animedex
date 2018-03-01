import React, { Component } from 'react'
import axios from 'axios'

class AnimeDex extends Component {
  constructor(props) {
    super(props)

    // User input and anime state
    this.state = {
      input: '',
      anime: {
        title: 'Naruto',
        synopsis: 'Moments prior to Naruto Uzumaki\'s birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi\'s rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto.  Now, Naruto is a hyperactive and knuckle-headed ninja still living in Konohagakure. Shunned because of the Kyuubi inside him, Naruto struggles to find his place in the village, while his burning desire to become the Hokage of Konohagakure leads him not only to some great new friends, but also some deadly foes.  [Written by MAL Rewrite]',
        rating: 75.8,
        image: 'https://media.kitsu.io/anime/poster_images/11/medium.jpg?1417705323'
      }
    }

    // Definition of all binding for functions
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.displayAnime = this.displayAnime.bind(this)
  }

  render() {
    return (
      <section className="animedex">
        <div className="container">
          <form onSubmit={this.handleSubmit} >
            <label>Search</label>
            <input onChange={this.onChange} type="text" />
            <button>Submit</button>
          </form>

          {this.displayAnime()}
        </div>
      </section>
    )
  }

  // Gets the user input and updates the input state
  onChange(e) {
    // User input value
    const value = e.target.value

    this.setState({ input: value })
  }

  // Will make the request to api as soon as
  // user submits data
  async handleSubmit(e) {
    e.preventDefault()
    const url = 'https://kitsu.io/api/edge//anime'

    // Gets the data for the anime requested
    const result = await axios.get(`${url}?filter[text]=${this.state.input}`)
    const data = result.data.data[0].attributes

    // Updates state with anime obj
    this.setState({
      anime: {
        title: data.titles.en,
        synopsis: data.synopsis,
        rating: data.averageRating,
        image: data.posterImage.medium
      }
    })
  }

  displayAnime() {
    // Will only works if there is any data on state
    if(this.state.anime) {
      const anime = this.state.anime

      // Will return data nicely formatted in wrapped html
      return (
        <div className="animeBox">
          <img className="img-responsive" src={anime.image} />

          <div className="animeInfo">
            <h2><span className="desc">Title:</span> {anime.title}</h2>
            <p><span className="desc">Synopsis:</span> {anime.synopsis}</p>
            <small><span className="desc">Rating:</span> {anime.rating}</small>
          </div>
        </div>
      )
    }
  }
}

export default AnimeDex
