import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);

      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
