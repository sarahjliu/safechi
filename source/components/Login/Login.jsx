import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

import styles from './Login.scss'
import * as _CONFIG from '../_config/Config.js'

class Login extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },
            redirect: false,
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let component = this;
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;
        axios.post(_CONFIG.devURL + '/login', formData)
          .then(function (response) {
            console.log(response);
//            location.href = '/dashboard';
            component.setState({
                redirect: true,
                userDetails: response.data
            })
          })
          .catch(function (error) {
            console.log(error);
            component.setState({
                    message: 'Incorrect name or password'
                })
          });
                location.href = '/analyze';

        }
    onMouseMove(e) {
      this.setState({ 
          x: e.nativeEvent.offsetX, 
          y: e.nativeEvent.offsetY 
      });
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    render() {
      const { x, y } = this.state;
        return(
            <div className="wrapper-login">
              {this.state.redirect ? <Redirect to={{pathname: '/dashboard', state:{user: this.state.userDetails}}}/> :
                <div className="ui vertical masthead center aligned segment landing-image-login">
                <div className="ui container">
                  <div className="ui large inverted secondary network menu">
                    <Link to="/" className="item" id="logo">SafeChi</Link>
                    <div className="right item">
                        <Link to="/login" className="item">
                      <Button className="ui button">Log in</Button>
                      </Link>
                        <Link to="/register" className="item">
                      <Button className="ui primary button" id="theme-blue">Sign Up</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login_form {
                    height: 100%;
                  }
                `}</style>
                <form className="login_form" action="/" onSubmit={this.onSubmit}>
                    <Grid
                      textAlign='center'
                      style={{ height: '100%' }}
                      verticalAlign='middle'
                    >
                      <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='#30BDDB' textAlign='center'>
                          Login
                        </Header>
                        <Form size='large'>
                          <Segment stacked>
                            <Form.Input
                              fluid
                              placeholder='Name'
                              onChange={this.onChangeName}
                            />
                            <Form.Input
                              fluid
                              placeholder='Password'
                              type='password'
                              onChange={this.onChangePassword} 
                            />

                            <Button fluid size='large' type="submit" id="theme-blue">Login</Button>
                          </Segment>
                        </Form>
                
                        <Message>
                          New to us? <Link to="/register">Sign Up</Link>
                        </Message>
                      </Grid.Column>
                    </Grid>
                </form>
              </div>}
            </div>
        )
    }
}

export default Login
