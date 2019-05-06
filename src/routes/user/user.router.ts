import express from 'express';
import * as handlers from './user.handlers';
import login from 'connect-ensure-login';

export default express.Router()
  .get('/', handlers.info)
  .post('/', handlers.register);
