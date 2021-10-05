const bcrypt = require('bcryptjs');
class bcryptPassword {
    hashpassword = (details, callback) => {
        try{
            const salt =  bcrypt.genSalt(10)
            const hashedPassword =  bcrypt.hash(this.password, salt)
                this.password = hashedPassword
                next()}
    catch (error) {
        return (error)
    }
}
}
module.exports = new bcryptPassword()