import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .required("Required Field"),
  userName: yup.string().required("Required Field"),
  password: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .matches(/(?=.*[a-z])/, "Expected to have minimum one lowercase char")
    .matches(/(?=.*[A-Z])/, "Expected to have minimum one uppercase char")
    .matches(
      /(?=.*[ -\/:-@\[-\`{-~]{1,})/,
      "Expected to have minimum 1 special char (@,!,#, etc)."
    )
    .required("Required Field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Required Field"),
  eMail: yup.string().required("Required Field"),
  confirmEMail: yup.string()
  .oneOf([yup.ref("eMail")], "e-Mail ID's do not match")
    .required("Required Field"),
  address: yup.string().required("Required Field"),
  pincode: yup
    .number()
    .positive("Pincode can have Positive values only")
    .required("Required Field"),
  state: yup.string().required("Required Field"),
  country: yup.string().required("Required Field"),
  securityQn: yup.string().required("Required Field"),
  securityAns: yup.string().required("Required Field"),
});

export default validationSchema;
