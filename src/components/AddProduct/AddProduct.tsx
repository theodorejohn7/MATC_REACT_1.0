import axios from "axios";
import { useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import { Container, Typography, Grid, Button, Box, Modal } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

import ValidationSchema from "./ValidationSchema";
import { FormTextField } from "../../components/FormTextField/FormTextField";

interface FormValues {
  category: string;
  description: string;
  discPrice: number;
  grossWeight: number;
  id: number;
  image: string;
  netWeight: number;
  price: number;
  title: string;
  rating: number;
}

export default function AddProduct() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(true);
  const handleClose = () => setOpen(false);

  


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

  const handleProdManagement = () => {
 setOpen(false)
 setContent(false)
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      {content && (
        <div
          className="border border-primary p-4 rounded "
          style={{
            textAlign: "center",
            boxShadow: "1px 3px 38px 10px rgba(139,149,237,1)",
          }}
        >
          <Typography
            align="center"
            variant="h5"
            style={{ lineHeight: 1.25, marginBottom: 16 }}
          >
            Add New Product
          </Typography>
          <Formik
            initialValues={{
              category: " ",
              description: " ",
              discPrice: 0,
              grossWeight: 0,
              id: 0,
              image: "",
              netWeight: 0,
              price: 0,
              title: "",
              rating: 0,
            }}
            validationSchema={ValidationSchema}
            onSubmit={(
              values: FormValues,
              formikHelpers: FormikHelpers<FormValues>
            ) => {
              setLoading(true);

              values.rating = 0;

              axios
                .post(`${API_URL}api/post`, values)
                .then((response) => {
                  if (
                    response.statusText === "Created" ||
                    response.status === 200
                  ) {
                    setLoading(false);
                    setErrorMessage("Details Registered Successfully");
                    setOpen(true);
                    console.log("data sent to Database");
                    setStatus(true);
                  }
                })
                .catch((error2) => {
                  setLoading(false);

                  console.log(error2);
                  if (error2.response.data.message === "User already exists") {
                    setLoading(false);
                    setErrorMessage("Username already Registered");
                    setOpen(true);
                  }
                });

              formikHelpers.setSubmitting(false);
            }}
          >
            {(formikProps: FormikProps<FormValues>) => (
              <Form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="id"
                      label="Product Id"
                      size="small"
                      component={FormTextField}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      name="category"
                      label="Product Category"
                      size="small"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="title"
                      label="Product Title"
                      size="small"
                      component={FormTextField}
                      style={{ width: "95%" }}
                    />
                  </Grid>

                  <Grid item xs={12} alignItems="stretch">
                    <Field
                      name="description"
                      label="Product Description"
                      size="medium"
                      component={FormTextField}
                      style={{ width: "95%" }}
                    />
                  </Grid>
                  <Grid item xs={12} alignItems="stretch">
                    <Field
                      name="image"
                      label="Product Image Link"
                      size="medium"
                      component={FormTextField}
                      style={{ width: "95%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="netWeight"
                      label="Net Weight"
                      type="number"
                      size="small"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="grossWeight"
                      label="Gross Weight"
                      type="number"
                      size="small"
                      component={FormTextField}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      name="price"
                      label="Price"
                      type="number"
                      size="small"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="discPrice"
                      label="Discounted Price"
                      type="number"
                      size="small"
                      component={FormTextField}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="outlined"
                      data-testid="test_submitButton"
                      size="large"
                      color="primary"
                      disabled={formikProps.isSubmitting}
                    >
                      {loading && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className=" mx-0 me-2 p-0 "
                        />
                      )}
                      Upload Product
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      )}

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
            {!status && (
              <Button onClick={handleClose} variant="contained">
                Ok
              </Button>
            )}
            {status && (
              <Button onClick={handleProdManagement} variant="contained">
                Navigate to Product Management Page
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </Container>
  );
}
