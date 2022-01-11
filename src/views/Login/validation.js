import * as yup from 'yup';
export default yup.object().shape({
  email: yup.string().email("email invalid").required('required'),
  password: yup.string().required('required'),

});
