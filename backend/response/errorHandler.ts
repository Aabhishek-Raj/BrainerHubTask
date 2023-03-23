import { NextFunction, Request, Response } from "express";  
import { ErrorResponse } from "./errorResponse";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    console.log('kfgfgknfjgnfkjgnfkjgnfjgnfjgnfjgnfgnj')

    if( err instanceof ErrorResponse) {  
        
        return res.status(400).send(err.getResponse() )
    }    

    res.status(400).send({ errors: [{ message: 'Something went wrong' }] })  
}   