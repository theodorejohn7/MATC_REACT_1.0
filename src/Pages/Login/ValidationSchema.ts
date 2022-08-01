import * as yup from "yup";
import YupPassword from 'yup-password';
YupPassword(yup)
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .required("Username Required"),

    password: yup
    .string().password().required(),
 
   
});

export default validationSchema;
