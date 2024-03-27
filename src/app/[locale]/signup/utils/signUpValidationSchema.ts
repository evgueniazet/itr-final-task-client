import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Incorrect email').required('login is required'),
    password: Yup.string()
        .min(8, 'password should contain 8 chars minimum')
        .matches(/(?=.*?[A-Z])/, 'password should contain 1 uppercase letter')
        .matches(/(?=.*?[a-z])/, 'password should contain 1 lowercase letter')
        .matches(/(?=.*?[0-9])/, 'password should contain 1 number')
        .matches(/(?=.*?[#?!@$%^&*-])/, 'password should contain 1 special character')
        .required('password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('password is required'),
});
