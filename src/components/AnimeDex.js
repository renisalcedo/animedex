import React, { Component } from 'react'
import axios from 'axios'

class AnimeDex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      anime: {title: '',  synopsis: '', rating: 0, image: ''}
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

          <div className="anime-info">
          </div>
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

    // Gets the data for the anime requested
    const result = await axios.get(`https://kitsu.io/api/edge//anime?filter[text]=${this.state.input}`)
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
}

export default AnimeDex
