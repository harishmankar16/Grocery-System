import { Response } from 'express';
import { AppServerConstant } from '../constants/constants';

export const handleResult = <T>(res: Response, statusCode: number, message: string, data: T = null) => {
  
  return res.status(statusCode).send({
    statusCode,
    message,
    status: AppServerConstant.SUCCESS_MESSAGES.SUCCESS,
    data,
  });

};