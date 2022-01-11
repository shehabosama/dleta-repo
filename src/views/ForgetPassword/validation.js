import * as yup from 'yup';
export default yup.object().shape({
  EMAIL_OR_PHONE: yup
    .string()
    .matches(`^(?:\d{11}|\w+@\w+\.\w{2,3})$`)
    .required('required'),
});
