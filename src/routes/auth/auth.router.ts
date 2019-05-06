import express from 'express';
import * as handlers from './auth.handlers';

export default express.Router()
  .get('/login', handlers.loginForm)
  .post('/login', handlers.login)
  .get('/logout', handlers.logout);
