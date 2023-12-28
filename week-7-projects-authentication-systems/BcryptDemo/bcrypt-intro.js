const bcrypt = require('bcrypt')

// how to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(password, salt)
  
  console.log(salt, '=> salt')
  console.log(hashPassword, '=> hashPassword')
}

// hashPassword('Cat12345')

// decode password
const login = async (password, hashPassword) => {
  const result = await bcrypt.compare(password, hashPassword);
  console.log(result)
  if (result) {
    console.log('LOGIN')
  }else {
    console.log('Not authenticated')
  }
}

login('Cat1245', '$2b$12$pTqeUIrED06nT2uuVxGNGOBppxG1VGS8leiEHRY5vjDLDR6GoVZay')
