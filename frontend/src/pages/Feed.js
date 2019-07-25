import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Spinner,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import './Feed.scss';
import API from 'Api';
import Paginate from 'Paginate';

class Feed extends Component {
  unHistoryListen = {};

  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);

    this.state = {
      isLoading: true,
      category: params.get('category') ? params.get('category') : 'husky',
      list: [],
      currPage: 1,
      pageList: [],
      pages: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.getFeed = this.getFeed.bind(this);
  }

  componentDidMount() {
    this.unHistoryListen = this.props.history.listen(
      (location) => {
        const params = new URLSearchParams(location.search);

        if (!location.state) {
          this.setState({
            isLoading: true,
            category: params.get('category') ? params.get('category') : 'husky', 
            list: []
          }, () => {
            this.getFeed();
          });
        }
      }
    );

    this.getFeed();
  }

  componentWillUnmount() {
    this.unHistoryListen();
  }

  getFeed() {
    API.get(`/feed?category=${this.state.category}`)
      .then(
        (response) => {
          let { list } = response.data;

          list = list.map((item, index) => {
            return {id: index, path: item}
          });

          this.setState({
            isLoading: false,
            list
          }, () => {
            this.handleChange(this.state.currPage);
          });
        }
      )
      .catch(
        (error) => {
          this.setState({ isLoading: false, error: 'Ocorreu um erro. Tente novamente.' });
        }
      );
  }

  handleChange(page) {
    const { list } = this.state;
    const { startIndex, endIndex, pages } = Paginate(list.length, page, 6, 8);
    const pageList = list.slice(startIndex, endIndex + 1);

    this.setState({ currPage: page, pages, pageList });
  }

  render() {
    return (
      <Container className="feed">
        <div className="content">
          {this.state.error && <p className="error">{this.error}</p>}
          {this.state.isLoading && <Spinner className="loading" type="grow" color="primary" />}

          <Row>
            {
              this.state.pageList.map((item, index) => (
                  <Col md="4" key={index}>
                    <div className="wrapper">
                      <Link className="btn btn-link" to={{
                        pathname: "/picture",
                        search: `?category=${this.state.category}&id=${item.id}`,
                        state: { modal: true }
                      }}>
                        <img className="image" src={item.path} alt="Dog alt" />
                      </Link>
                    </div>
                  </Col>
                )
              )
            }
          </Row>
          <Row>
            <Col>
              <Pagination className="pager">
                {
                  this.state.pages.map((item, index) => (
                      <PaginationItem key={index} active={item === this.state.currPage}>
                        <PaginationLink onClick={() => this.handleChange(item)}>{item}</PaginationLink>
                      </PaginationItem>
                    )
                  )
                }
              </Pagination>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default Feed;
