import express from 'express';
import * as handlers from './client.handlers';

export default express.Router()
  .get('/', handlers.info)
  .post('/', handlers.register);
