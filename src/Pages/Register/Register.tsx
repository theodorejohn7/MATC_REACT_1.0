import axios from "axios";
import { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Modal,
  MenuItem,
  InputLabel,
  TextFieldProps
} from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from "formik";

import ValidationSchema from "./ValidationSchema";
import { FormTextField } from "../../components/FormTextField/FormTextField";
interface countryList {
  iso2: string;
  iso3: string;
  name: string;
  states: [{ name: string }];
}

interface FormValues {
  name: string;
  userName: string;
  password: string;
  confirmPassword: string;
  eMail: string;
  confirmEMail: string;
  address: string;
  state: string;
  country: string;
  securityQn: string;
  securityAns: string;
  pincode: string;
}

export const DropDownField: React.FC<FieldProps & TextFieldProps> = (props: any) => {
  const propsVal = props.data;
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select className="w-75 border h-50" label="Country" name="countr" onChange={props.onChange}>
        {propsVal?.map((value: any, index: number) => (
          <MenuItem key={index} value={value.name}>
            {value.name}{" "}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default function Register() {
  const USER_API_URL = process.env.REACT_APP_USER_API_URL;

  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [country, setCountry] = useState([]);
  const [userCountry, setUserCountry] = useState("");
  const [state, setState] = useState([""]);
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    margin: 0,
    padding: 0,
    p: 4
  };

  const initialCountry: countryList = {
    iso2: "",
    iso3: "",
    name: "",
    states: [{ name: "" }]
  };

  const handleRegister = () => {
    navigate(`/login`);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selCountry = event.target.value;
    setUserCountry(event.target.value);
    const selCity: countryList =
      country.find((val: countryList) => val.name === selCountry) || initialCountry;

    const states = selCity.states;

    const stateList: string[] = [];
    states.map((value) => stateList.push(value.name));

    setState(stateList);
  };

  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get("https://countriesnow.space/api/v0.1/countries/states/");
      setCountry(response.data.data);
    };
    getdata();
  }, []);

  return (
    <Container maxWidth="sm" className="global-MarginTop">
      <div className=" register-BoxShadow  border border-primary p-4 rounded ">
        <Typography align="center" variant="h5" className="register-Title">
          Register Form
        </Typography>
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
            pincode: "",
            country: "",
            securityQn: "",
            securityAns: ""
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
            setLoading(true);
            console.log("@$#values", values);
            const data = {
              name: values.name,
              eMail: values.eMail,
              password: values.password,
              userName: values.userName,
              address: values.address,
              pincode: values.pincode,
              state: values.state,
              country: values.country,
              secQuestion: values.securityQn,
              secAnswer: values.securityAns
            };

            axios
              .post(`${USER_API_URL}/register`, data)
              .then((response) => {
                if (response.statusText === "Created" || response.status === 201) {
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
          }}>
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="name" label="Name" size="small" component={FormTextField} />
                </Grid>

                <Grid item xs={6}>
                  <Field name="userName" label="User Name" size="small" component={FormTextField} />
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
                    className="my-2"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>

                <Grid xs={6} className="my-0 py-0" alignItems="stretch">
                  <Field
                    label="Country"
                    name="country"
                    onChange={handleChange}
                    // value="Country List"
                    value={userCountry}
                    className="mx-3   py-0 my-0  w-100"
                    data={country}
                    style={{ width: "90%" }}
                    component={DropDownField}></Field>
                </Grid>

                <Grid item sm={6}>
                  <Field
                    name="securityQn"
                    label="Security Question"
                    className="my-2"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid xs={6} className="my-0 py-0" alignItems="stretch">
                  <InputLabel className="my-0 py-0">State</InputLabel>

                  <Field
                    className="w-75 p-0 h-50 m-0"
                    name="state"
                    label="state"
                    component={Select}>
                    {state.map((value: string, index: number) => (
                      <MenuItem value={value} key={index}>
                        {value}
                      </MenuItem>
                    ))}
                  </Field>
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
                    data-testid="test_submitButton"
                    size="large"
                    color="primary"
                    disabled={formikProps.isSubmitting}>
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
        aria-describedby="modal-modal-description">
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
              <Button onClick={handleRegister} variant="contained">
                Navigate to Login Page
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </Container>
  );
}
