const bcrypt = require("bcrypt")

exports.PasswordHashing = async ( password ) => {
    const result = await bcrypt.hash(password, 10)
    return result
}

exports.PasswordCompare = async (password, passwordHash ) => {
    const match = await bcrypt.compare(password, passwordHash)
    return match
}