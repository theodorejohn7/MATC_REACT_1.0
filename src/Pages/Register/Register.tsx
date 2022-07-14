import * as React from "react";
import { Container, Typography, Grid, Button } from "@mui/material";

import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

import database from '../../axios/firebase'
import { FormTextField } from "../../components/FormTextField/FormTextField";
 
import ValidationSchema from "./ValidationSchema";

interface FormValues {
  name: string;
   userName: string;
  password: string;
  confirmPassword: string;
  eMail: string;
  confirmEMail:string;
  address: string;
  pincode: number;
  state: string;
  country: string;
  securityQn: string;
  securityAns: string;
}

export default function Login() {
  return (
    <Container maxWidth="sm"  >
      {/* <Box mb={3} p={2}> */}
      <div style={{ textAlign: "center" }}>
        <Typography
          align="center"
          variant="h5"
          style={{ lineHeight: 1.25, marginBottom: 16 }}
        >
          Register Form
        </Typography>
        {/* </Box> */}

        <Formik
          initialValues={{
            name: "",
            userName: "",
            password: "",
            confirmPassword: "",
            eMail: "",
            confirmEMail:"",
            address: "",
            state: "",
            pincode: 0,
            country: "",
            securityQn: "",
            securityAns: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            console.log(values);
            
            database.ref(values.name).set({
                name: values.name ,
                userName: values.userName ,
                password: values.password ,
                eMail: values.eMail, 
                address: values.address,
                state: values.state,
                pincode: values.pincode,
                country: values.country,
                securityQn: values.securityQn,
                securityAns: values.securityAns,
                }).catch(alert);
            formikHelpers.setSubmitting(false);
          }}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="name"
                    label="Name"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Field
                    name="userName"
                    label="User Name"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="eMail"
                    label="e-Mail address"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="confirmEMail"
                    label="Confirm e-Mail address"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}    alignItems="stretch" >
                  <Field
                    name="address"
                    label="Address"
                    size="medium"
                    component={FormTextField}
                    style={{ width:'95%'}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="pincode"
                    label="Pincode"
                   
                    type="number"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="state"
                    label="State"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Field
                    name="country"
                    label="Country"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Field
                    name="securityQn"
                    label="Security Question"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
             
                <Grid item xs={6}>
                  <Field
                    name="securityAns"
                    label="Security Answer"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={6}>
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
