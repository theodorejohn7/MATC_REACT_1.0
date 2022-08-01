import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .required("Username Required"),
  password: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .matches(/(?=.*[a-z])/, "Expected to have minimum one lowercase char")
    .matches(/(?=.*[A-Z])/, "Expected to have minimum one uppercase char")
    .matches(
      /(?=.*[ -\/:-@\[-\`{-~]+)/,
      "Expected to have minimum 1 special char (@,!,#, etc)."
    )
    .required("Password Required"),
   
});

export default validationSchema;
