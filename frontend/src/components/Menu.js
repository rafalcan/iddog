import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, NavItem } from 'reactstrap';
import './Menu.scss';

const Menu = () => (
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
      <Button className="link" color="link">Sair</Button>
    </NavItem>
  </Nav>
);

export default Menu;
