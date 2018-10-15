export interface User {
  name: string;
  email: string;
  password?: string;
  hash?: string;
  salt?: string;
  token?: string;
}
