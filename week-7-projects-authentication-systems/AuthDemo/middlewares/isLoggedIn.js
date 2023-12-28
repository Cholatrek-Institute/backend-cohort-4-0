// JWT - JSON Web Token
const jwt = require("jsonwebtoken")

const isLoggedIn = (req, res, next) => {
  // check if the authorization header is present
  const token = req.headers.authorization

  console.log(token, 'token')
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access "})
  }
  try {
    // verify token
    const sign_token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(sign_token, process.env.secrets)
    console.log(decoded, 'decoded token')

    if(!decoded) {
      return res.status(401).json({ message: "Unauthorized access"})
    }
    // attach the user to the request object
    req.user = decoded
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = isLoggedIn
