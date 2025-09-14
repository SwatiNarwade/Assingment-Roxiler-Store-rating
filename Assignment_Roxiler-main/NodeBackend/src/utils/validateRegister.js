const validate = require('validator');

const validateRegister = (req) => {
    const { FirstName, LastName, Email, Phone, Password ,Address} = req.body;
    if (!FirstName || !LastName || !Email || !Phone  || !Password) throw new Error("All fields are required error from backend");
      const fullName = `${FirstName} ${LastName}`.trim();
    if (fullName.length < 10 || fullName.length > 60) {
        throw new Error("Name must be between 20 and 60 characters.");
    }

   if (Address && Address.length > 400) {
        throw new Error("Address must not exceed 400 characters.");
    }
    if (!validate.isEmail(Email) || !validate.isStrongPassword(Password)) throw new Error("Invalid email or password");
    if(req.body.RoleId){
        if(![1,2,3].includes(req.body.RoleId)) throw new Error("Invalid RoleId");

    }
}

module.exports = {
    validateRegister
}