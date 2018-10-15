
declare namespace Express {
  export interface Request {
    payload?: { email: string, iat: number };
  }
}
