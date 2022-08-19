import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  PointerEventHandler,
  useEffect,
  useState
} from "react";

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
import { EventType } from "@testing-library/react";

interface countryList {
  iso2: string;
  iso3: string;
  country: string;
  cities: Array<string>;
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
  console.log("@$# props", props);
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select label={props.label} onChange={props.onChange}>
        {propsVal?.map((value: any, index: number) => (
          <MenuItem key={index} value={value.country}>
            {value.country}{" "}
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
    country: "",
    cities: [""]
  };

  const handleRegister = () => {
    navigate(`/login`);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log("@$#", event);
    const selCountry = event.target.value;
    const selCity: countryList =
      country.find((val: countryList) => val.country === selCountry) || initialCountry;
    setState(selCity.cities);
  };

  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get("https://countriesnow.space/api/v0.1/countries/");

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
                <Grid xs={6} alignItems="stretch">
                  <Field
                    label="CountryDD"
                    name="countrydd"
                    onChange={handleChange}
                    value="Country List"
                    className="mx-3 mt-3"
                    data={country}
                    style={{ width: "90%" }}
                    component={DropDownField}></Field>
                </Grid>
                <Grid xs={6} alignItems="stretch">
                  <Field label="StateDD" name="statedd" displayEmpty={true} component={Select}>
                    {state.map((value: string, index: number) => (
                      <MenuItem value={value} key={index}>
                        {value}
                      </MenuItem>
                    ))}
                  </Field>
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
                  <Field name="state" label="State" size="small" component={FormTextField} />
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
                  <Field name="country" label="Country" size="small" component={FormTextField} />
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
