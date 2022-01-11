import * as yup from 'yup';

export default yup.object().shape({
  client: yup.string().required('required'),
  department: yup.string().required('required'),
  address: yup.string().required('required'),
  // comments: yup.string().required('required'),
});
