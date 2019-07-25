import React, { Component } from 'react';
import {
  Container, Row, Col, Form,
  FormGroup, Input, Button,
  FormText, FormFeedback
} from 'reactstrap';
import './SignUp.scss';
import { AuthConsumer } from 'providers/Auth';
import API from 'Api';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      validate: {
        emailState: '',
      }
    }

    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(e) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;

    if (emailReg.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  async handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    await this.setState({
      [name]: value
    });
  }

  async handleSubmit (e, login) {
    e.preventDefault();
    const { email } = this.state;

    if (!email) {
      this.setState({ error: 'Preencha todos os dados para se cadastrar' });
    } else {
      try {
        const response = await API.post('/signup', { email });
        login(response.data.user.token);
        this.props.history.push('/feed');
      } catch (error) {
        this.setState({ error: 'Ocorreu um erro. Tente novamente.' });
      }
    }
  }

  render() {
    const { email } = this.state;

    return (
      <AuthConsumer>
        {({ login }) => (
          <Container className="signup">
            <div className="content">
              {this.state.error && <p className="error">{this.state.error}</p>}
              <Form className="form" onSubmit={(e) => { this.handleSubmit(e, login); }} autoComplete="off" noValidate>
                <FormGroup className="justify-content-center" row>
                  <Col xs={10} md={4}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Insira seu e-mail"
                      value={ email }
                      valid={ this.state.validate.emailState === 'has-success' }
                      invalid={ this.state.validate.emailState === 'has-danger' }
                      onChange={(e) => {
                                  this.validateEmail(e);
                                  this.handleChange(e);
                                }}
                    />
                    <FormFeedback>
                      Por favor, coloque um e-mail válido.
                    </FormFeedback>
                    <FormText>
                      Insira seu e-mail para entrar.
                    </FormText>
                  </Col>
                </FormGroup>
                <Row className="justify-content-center">
                  <Col xs={10} md={4}>
                    <Button color="primary" block>Entrar</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Container>
        )}
      </AuthConsumer>
    );
  }
}

export default SignUp;
