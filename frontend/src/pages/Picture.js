import React, { Component } from 'react';
import {
  Container, Spinner, Button
} from 'reactstrap';
import './Picture.scss';
import API from 'Api';

class Picture extends Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);

    this.state = {
      isLoading: true,
      category: params.get('category'),
      id: params.get('id'),
      image: ''
    }

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    API.get(`/feed?category=${this.state.category}`)
      .then(
        (response) => {
          const { list } = response.data;

          this.setState({
            isLoading: false,
            image: list[this.state.id]
          });
        }
      )
      .catch(
        (error) => {
          this.setState({ isLoading: false, error: 'Ocorreu um erro. Tente novamente.' });
        }
      );
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.history.goBack();
  }

  render() {
    const { state = {} } = this.props.location;
    const { modal } = state;

    return (
      <Container className={'picture ' + (modal && '-modal')}>
        <div className="content">
          {this.state.isLoading && <Spinner className="loading" type="grow" color="primary" />}

          <Button className="btn-close" color="primary"
            onClick={(e) => {this.handleClose(e)}}
          >Voltar</Button>

          <img className="image" src={this.state.image} alt="Dog alt" />
        </div>
      </Container>
    );
  }
}

export default Picture;
