import * as React from "react";
import { Container, Typography, Grid, Button } from "@mui/material";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import database from "../../axios/firebase";
import { FormTextField } from "../../components/FormTextField/FormTextField";

import ValidationSchema from "./ValidationSchema";

interface FormValues {
  name: string;
  userName: string;
  password: string;
  confirmPassword: string;
  eMail: string;
  confirmEMail: string;
  address: string;
  pincode: number;
  state: string;
  country: string;
  securityQn: string;
  securityAns: string;
}

export default function Register() {
  const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;
  const [status, setStatus] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()


  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    margin: 0,
    padding: 0,
    p: 4,
  };


  const handleRegister = () => {
    navigate(`/home`)
  }
  return (
    <Container maxWidth="sm" style={{  marginTop:'20px',}}>
      {/* <Box mb={3} p={2}> */}
      <div className="border border-primary p-4 rounded " style={{ textAlign: "center",boxShadow: '1px 3px 38px 10px rgba(139,149,237,1)' }}>
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
            confirmEMail: "",
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

            axios
              .get(`${FIREBASE_URL}/${values.userName}.json`)
              .then((response) => {
                console.log("response", response.data);
                console.log("value", values);

                if (values.userName === response.data.userName) {
                  setErrorMessage("Username already Registered");
                  setOpen(true);
                }
              }).catch((_error)=>{
                 console.log("logging data to db")
                database
                .ref(values.userName)
                .set({
                  name: values.name,
                  userName: values.userName,
                  password: values.password,
                  eMail: values.eMail,
                  address: values.address,
                  state: values.state,
                  pincode: values.pincode,
                  country: values.country,
                  securityQn: values.securityQn,
                  securityAns: values.securityAns,
                })
                .catch(alert);
                setErrorMessage("Details Registered Successfully");
                setOpen(true);
                console.log("data sent to Database")
               setStatus(true)

              });
              

          

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
                <Grid item xs={12} alignItems="stretch">
                  <Field
                    name="address"
                    label="Address"
                    size="medium"
                    component={FormTextField}
                    style={{ width: "95%" }}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="border border-secondary p-2 rounded" sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
          <div className="  float-end ">
            {!status&&<Button onClick={handleClose} variant="contained">
              Ok
            </Button>}
{
  status&&<Button onClick={handleRegister} variant="contained">
 Navigate to Homepage
</Button>
} 
          </div>
        </Box>
      </Modal>
    </Container>
  );
}
