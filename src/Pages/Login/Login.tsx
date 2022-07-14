import * as React from "react";
 
import {Container, Typography,Grid, Button} from "@mui/material"
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import axios from "axios";

import {FormTextField} from "../../components/FormTextField/FormTextField"
import ValidationSchema from "./ValidationSchema"
interface FormValues {
  name: string;
  password: string;
}

 
export default function Login() {
  const [username,setUsername]=React.useState("");
  const [password,setPassword]= React.useState("");
  return (

    <Container maxWidth="md" >
      {/* <Box mb={3} p={2}> */}
      <div style={{  textAlign:'center'}}>
       

        <Typography
          align="center"
          variant="h5"
          style={{ lineHeight: 1.25, marginBottom: 16 }}
        >
          Login Form
        </Typography>
      {/* </Box> */}
     

      <Formik
        initialValues={{
          name: "",
          password: ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          console.log(values);

          axios
          .get(
            `/${values.name}.json`
          )
          .then((response) => {
           
console.log(values.name,response.data.name)
if(values.name === response.data.name)
{
  console.log("available name")
}
if(values.password !== response.data.password)
{
  console.log("invalid password")
}
console.log(username,password)
          });

          formikHelpers.setSubmitting(false);
        }}

        
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  label="Name"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      </div>

    </Container>

  );
}
