import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/[A-Za-z] $/, "Name cannot contain Number or Special Characters")
    .required("Required Field"),
  userName: yup
    .string()
    .matches(/[A-Za-z0-9]$/, "Username cannot contain Special Character")
    .min(8, "Expected to have minimum 8 characters")
    .required("Required Field"),
  password: yup.string().password().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Required Field"),
  eMail: yup
    .string()
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Must be a valid email")
    .email("Must be a valid email")
    .required("Required Field"),
  confirmEMail: yup
    .string()
    .oneOf([yup.ref("eMail")], "e-Mail ID's do not match")
    .required("Required Field"),
  address: yup
    .string()
    .matches(
      /^[a-zA-Z0-9@#()_+\-=[\];':"\\|,./?]*$/,
      "Address can contain only following symbols /,-,(,),[,],#,."
    )
    .required("Required Field"),
  pincode: yup
    .string()
    .required()
    .matches(
      /[1-6]{1}\d{2}(0{0,2}[1-9]|0?[1-9]\d|[1-9]\d\d)$/,
      "Must be only number starting from 6 with 6 digits"
    )
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .required("Required Field"),
  state: yup.string().required("Required Field"),
  country: yup.string().required("Required Field"),
  securityQn: yup.string().required("Required Field"),
  securityAns: yup.string().required("Required Field")
});

export default validationSchema;
