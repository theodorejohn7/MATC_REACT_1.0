import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const validationSchema = yup.object().shape({
  name: yup.string().required("Required Field"),
  userName: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .required("Required Field"),
  password: yup.string().password().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Required Field"),
  eMail: yup.string().email("Must be a valid email").required("Required Field"),
  confirmEMail: yup
    .string()
    .oneOf([yup.ref("eMail")], "e-Mail ID's do not match")
    .required("Required Field"),
  address: yup.string().required("Required Field"),
  pincode: yup
    .string()
    .required()
    .matches(/^\d+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .required("Required Field"),
  state: yup.string().required("Required Field"),
  country: yup.string().required("Required Field"),
  securityQn: yup.string().required("Required Field"),
  securityAns: yup.string().required("Required Field"),
});

export default validationSchema;
