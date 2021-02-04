const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const { db, jwt_secret } = require("./conf");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (formMail, formPassword, done) => {
      try {
        db.query(
          "SELECT id, nickname, email, password, FROM users WHERE email=?",
          [formMail],
          (err, sqlRes) => {
            if (err) {
              return done(e);
            } else {
              if (!sqlRes.length) return done(null, false);
              const { id, email, password, firstname, lastname } = sqlRes[0];
              const isPasswordOK = bcrypt.compareSync(formPassword, password);
              if (!isPasswordOK) return done(null, false, "Wrong password!");

              const user = { id, email, firstname, lastname };
              return done(null, user);
            }
          }
        );
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt_secret,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
