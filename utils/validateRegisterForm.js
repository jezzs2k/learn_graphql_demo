module.exports.validateRegisterForm = ({username, email, password, comfirmPassword}) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    };

    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }else {
        const regEX =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.match(regEX)) {
            errors.email = 'Email must be valid email adress';
        }
    };

    if(password === ''){
        errors.password = 'Password must not be empty!';
    }else if (password !== comfirmPassword){
        errors.comfirmPassword = 'Comfirm password not match!';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
};

module.exports.validateLoginInput = ({username, password}) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    };

    if(password === ''){
        errors.password = 'Password must not be empty!';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}