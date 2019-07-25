import React, { createContext, Component } from 'react';

const AuthContext = createContext();

export const TOKEN = 'IDWDogDB';

export class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem(TOKEN),
      isAuthenticated: this.isAuthenticated,
      login: this.login,
      logout: this.logout
    };
  }

  isAuthenticated = () => {
    return this.state.token !== null;
  }

  login = (newToken) => {
    this.setState({ token: newToken });
    localStorage.setItem(TOKEN, newToken);
  }

  logout = () => {
    this.setState({ token: null });
    localStorage.removeItem(TOKEN);
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
