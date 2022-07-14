import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Expected to have minimum 8 characters")
    .required("Required"),
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
   
});

export default validationSchema;
