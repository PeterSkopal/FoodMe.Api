import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  constructor() {}

  getPassword(password): { hash: any; salt: any } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
      .toString('hex');
    return { hash, salt };
  }

  validatePassword(password, hash, salt): boolean {
    const calcHash = crypto
      .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
      .toString('hex');
    return calcHash === hash;
  }

  generateJWT(email: string) {
    return jwt.sign(
      {
        email: email,
      },
      'secret'
    );
  }

  toAuthJSON(email: string) {
    return {
      email: email,
      token: this.generateJWT(email),
    };
  }
}
