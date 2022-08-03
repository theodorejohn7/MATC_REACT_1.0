import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const validationSchema = yup.object().shape({
  id:yup.string()
    .required()
    .matches(/^\d+$/, "Must be only Number")
    .required("Required Field"),
  
  category: yup
    .string()
    .required("Required Field"),
    title: yup
    .string()
    .required("Required Field"),
    description: yup
    .string()
    .required("Required Field"),
    image: yup
    .string()
    .required("Required Field"),
    netWeight:yup.string()
    .required()
    .matches(/^\d+$/, "Must be only Number")
    .required("Required Field"),
    grossWeight:yup.string()
    .required()
    .matches(/^\d+$/, "Must be only Number")
    .required("Required Field"),
    price:yup.string()
    .required()
    .matches(/^\d+$/, "Must be only Number")
    .required("Required Field"),
    discPrice:yup.string()
    .required()
    .matches(/^\d+$/, "Must be only Number")
    .required("Required Field"),

 
});

export default validationSchema;
