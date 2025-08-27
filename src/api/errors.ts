export class AuthError extends Error {
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'AuthError';
  }
}

export class TokenRefreshError extends Error {
  constructor(message = 'Token refresh failed') {
    super(message);
    this.name = 'TokenRefreshError';
  }
}


export class ResponseError extends Error {
  constructor(message = 'Wrong response occurred') {
    super(message);
    this.name = 'ResponseError';
  }
}
