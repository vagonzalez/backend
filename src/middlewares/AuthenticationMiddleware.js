import chalk from 'chalk'

// Adds the user attribute, representing the currently-logged-in user,
// to every incoming request object.

const AuthenticationMiddleware = (debug = false) => (req, res, next) => {
  // De momento solo añade la propiedad user al request
  // En cuanto esté el modelo User, se podrá agregar el usuario al request
  req.user = undefined
  if (debug) console.log(chalk.cyan(`AuthenticationMiddleware: User - ${ req.user ? req.use.username : 'None'}`))
  next()
}

export default AuthenticationMiddleware
