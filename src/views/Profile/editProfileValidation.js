import * as yup from 'yup';

export default yup.object().shape({
  EMAIL: yup
    .string()
    .email('email invalid')
    .required('required'),
  PHONE: yup.string().required('required'),
  ADDR: yup.string().required('required'),
  PASSWORD: yup
    .string()
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*#?&-.]{8,}$/,
      'password-invalid',
    ),

  confirmPASSWORD: yup
    .string()
    .test('confirmPASSWORD', 'password-not-match', function(value) {
      return this.parent.PASSWORD === value;
    }),
});
