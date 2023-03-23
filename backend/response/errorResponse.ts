type ErrorResponseType = {
    status: number;
    data: null;
    message: string;
  };
  
  export class ErrorResponse extends Error {
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
  
    getResponse(): ErrorResponseType {
      return {
        status: 0,
        data: null,
        message: this.message,
      };
    }
  } 