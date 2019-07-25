import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Nav, NavItem } from 'reactstrap';
import './Menu.scss';
import { AuthConsumer } from 'providers/Auth';

class Menu extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ logout }) => (
          <Nav className="menu justify-content-center">
            <NavItem>
              <Link className="nav-link" to={{ pathname: "/feed", search: "?category=husky" }}>Husky</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={{ pathname: "/feed", search: "?category=labrador" }}>Labrador</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={{ pathname: "/feed", search: "?category=hound" }}>Hound</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={{ pathname: "/feed", search: "?category=pug" }}>Pug</Link>
            </NavItem>
            <NavItem>
              <Button color="link"
                onClick={() => {
                  logout();
                  this.props.history.push('/');
                }}
              >Sair</Button>
            </NavItem>
          </Nav>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(Menu);
