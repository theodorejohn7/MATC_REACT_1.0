import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .required("Required"),
  userName: yup.string().required("Required"),
  password: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .matches(/(?=.*[a-z])/, "Expected to have minimum one lowercase char")
    .matches(/(?=.*[A-Z])/, "Expected to have minimum one uppercase char")
    .matches(
      /(?=.*[ -\/:-@\[-\`{-~]{1,})/,
      "Expected to have minimum 1 special char (@,!,#, etc)."
    )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Required"),
  eMail: yup.string().required("Required"),
  confirmEMail: yup.string()
  .oneOf([yup.ref("eMail")], "e-Mail ID's do not match")
    .required("Required"),
  address: yup.string().required("Required"),
  pincode: yup
    .number()
    .positive("Pincode can have Positive values only")
    .required("Required"),
  state: yup.string().required("Required"),
  country: yup.string().required("Required"),
  securityQn: yup.string().required("Required"),
  securityAns: yup.string().required("Required"),
});

export default validationSchema;
