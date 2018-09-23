import React, { Component } from 'react'

import SearchBar from '../components/SearchBar';
import BlogList from '../components/BlogList';

const link = "https://cdn.rawgit.com/kevinhermawan/ca5e0083648ba5ffb2421808d972dd9c/raw/c29c7ee02849b58024fb6a058acae33bde38cbd3/react-blog-example.json";

class App extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      blogs: [],
      blogsFiltered: []
    }
  }

  componentDidMount() {
    this.handleGetBlogs()
  }

  handleTypeSearch = event => {
    const blogsFiltered = this.state.blogs.filter((blog) => {
      return blog.title.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
    })

    this.setState({ blogsFiltered: blogsFiltered })
  }

  handleGetBlogs = () => {
    fetch(link)
      .then(res => res.json())
      .then(res => this.setState({ blogs: res, blogsFiltered: res, loading: false }))
  }
  
  render() {

    if(this.state.loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <div>
        <SearchBar onChangeSearch={this.handleTypeSearch} />
        {this.state.blogsFiltered.map((blog, index) => (
          <BlogList
            key={index}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            date={blog.created_at}
          />
        ))}
      </div>
    )
  }
}

export default App