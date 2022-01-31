import { Strategy as LocalStrategy } from 'passport-local'
import { userService } from '../services'
import bcrypt from 'bcrypt'
import passport from 'passport'

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id: string, done) => {
  const user = await userService.getById(id).catch(err => done(err))
  done(null, user || null)
})

passport.use(
  new LocalStrategy(
    { usernameField: 'national_id' },
    async (national_id, password, done) => {
      try {
        const user = await userService.getByNationalId(national_id)
        // User proactive creation:
        if (!user) {
          const hashedPassword = await bcrypt.hash(
            password,
            (process.env.BCRYPT_SALT_ROUNDS &&
              +process.env.BCRYPT_SALT_ROUNDS) ||
              10
          )

          const newUser = await userService.create(national_id, hashedPassword)
          return done(null, newUser, { message: 'new-user' })
        }

        // Existing user check:
        const passwordMatched = await bcrypt.compare(password, user.password)

        if (passwordMatched) return done(null, user)
        throw new Error('Incorrect password login attempt')
      } catch (err) {
        console.error(err)
        return done('Something went wrong, please check and try again')
      }
    }
  )
)

export default passport
