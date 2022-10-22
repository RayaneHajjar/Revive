export const VALIDATOR_REQUIRE = () => ({ type: 'REQUIRE' });
export const VALIDATOR_MINLENGTH = (val) => ({ type: 'MINLENGTH', val: val });
export const VALIDATOR_MAXLENGTH = (val) => ({ type: 'MAXLENGTH', val: val });
export const VALIDATOR_PASSWORD = () => ({ type: 'PASSWORD' });
export const VALIDATOR_CONFIRMPASSWORD = (val) => ({ type: 'CONFIRMPASSWORD', val: val });
export const VALIDATOR_EMAIL = () => ({ type: 'EMAIL' });

export const validate = (value, validators) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === 'REQUIRE') {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === 'MINLENGTH') {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === 'MAXLENGTH') {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === 'PASSWORD') {
            isValid = isValid && /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(value);
        }
        if (validator.type === 'CONFIRMPASSWORD') {
            isValid = isValid && value === validator.val;
        }
        if (validator.type === 'EMAIL') {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
    return isValid;
};
