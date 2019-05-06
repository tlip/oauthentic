import express from 'express';
import * as handlers from './oauth2.handlers';

export default express.Router()
  .get('/authorize', handlers.authorization)
  .post('/authorize/decision', handlers.decision)
  .post('/token', handlers.token);
