import * as passport from 'passport';
const LocalStrategy = require('passport-local');

import { User } from './../models';
import { UserRepository } from './../repositories/user.repository';
import { AuthService } from './../services/auth.service';

const auth = new AuthService();
const repo = new UserRepository();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  repo.getUserByEmail(email)
    .then((user: User) => {
      if(!user || !auth.validatePassword(password, user.hash, user.salt)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));
