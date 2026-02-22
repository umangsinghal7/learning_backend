const bcrypt = require('bcrypt');

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password,12);
    console.log(salt);
    console.log(hash);
}


const login = async (pw, hashedpw) => {
    const isMatch = await bcrypt.compare(pw, hashedpw);
    if(isMatch) {
        console.log('Login successful');
    } else {
        console.log('Login failed');
    }
}

// hashPassword('umang');
login('umang', '$2b$10$HnjnyibeliWv9qxMQLYXJOnHpyElrTiOv8mw3FQZceWONKddaTWB')