import React, { Component } from 'react';
import {
  Container, Row, Col, Spinner
} from 'reactstrap';
import './Feed.scss';
import API from 'Api';

class Feed extends Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);

    this.state = {
      isLoading: true,
      category: params.get('category') ? params.get('category') : 'husky',
      list: []
    }
  }

  componentDidMount() {
    API.get(`/feed?category=${this.state.category}`)
      .then(
        (response) => {
          const { category, list } = response.data;
          this.setState({ isLoading: false, category, list });
        }
      )
      .catch(
        (error) => {
          this.setState({ isLoading: false, error: 'Ocorreu um erro. Tente novamente.' });
        }
      )
  }

  render() {
    return (
      <Container className="feed">
        <div className="content">
          {this.state.error && <p className="error">{this.error}</p>}
          {this.state.isLoading && <Spinner className="loading" type="grow" color="primary" />}
        </div>
      </Container>
    )
  }
}

export default Feed;
