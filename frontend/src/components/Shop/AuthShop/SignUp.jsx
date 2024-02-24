import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  Alert,
} from "@mui/material";
import AuthHeader from "./AuthHeader";
import avatar from "../../../assets/login.png";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postFetch } from "../../../network";
import { setter } from "../../../state/tokenSlice";
const schema = yup.object().shape({
  firstName: yup.string().required("You must enter first name"),
  lastName: yup.string().required("You must enter last name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted."),
});
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const { control, formState, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const res = await postFetch('auth/register', userData);
      console.log(">>> res", res)
      dispatch(setter(res.token))
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Đăng ký thành công")
    } catch (err) {
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Email đã tồn tại")
    }
    reset(defaultValues);
  };
  return (
    <>
      <AuthHeader />
      <div className="flex items-center justify-center bg-[#F8FCF8]">
      <div className="flex justify-between w-xl py-28">
          <Box className="mt-3 hidden items-center md:flex w-1/2">
            <div>
              <img
                className="w-full h-auto"
                src={avatar}
                alt="banner"
              />
            </div>
          </Box>
          <Paper className="overflow-hidden shadow-sm md:w-[30%] rounded mx-auto py-8 px-16">
            <div className="px-10 py-10">
              <Typography
                className="mt-32 tracking-tight leading-tight"
                sx={{ fontSize: "2rem", fontWeight: "800" }}
              >
                Sign up
              </Typography>
              <div className="flex items-baseline mt-2 font-medium">
                Already have an account?<Link className="ml-2" to="/shop/login">Sign in</Link>
              </div>
              {
                showAlert && (
                  <Alert
                    severity={alertSeverity}
                    onClose={() => setShowAlert(false)}
                    open={showAlert}
                    sx={{marginTop:"1rem"}}
                  >
                    {alertMessage}
                  </Alert>
                )
              }
              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full mt-[1rem]"
                onSubmit={handleSubmit}
              >
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ marginBottom: "1.5rem" }}
                      label="First Name"
                      id="firstName"
                      autoFocus
                      type="name"
                      variant="outlined"
                      error={!!errors.firstName}
                      helperText={errors?.firstName?.message}
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ marginBottom: "1.5rem" }}
                      label="Last Name"
                      id="lastName"
                      autoFocus
                      type="name"
                      variant="outlined"
                      error={!!errors.lastName}
                      helperText={errors?.lastName?.message}
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ marginBottom: "1.5rem" }}
                      label="Email"
                      id="email"
                      autoFocus
                      type="email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      sx={{ marginBottom: "1.5rem" }}
                      autoFocus
                      id="password"
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password (Confirm)"
                      sx={{ marginBottom: "1.5rem" }}
                      autoFocus
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="acceptTermsConditions"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label="I agree to the Terms of Service and Privacy Policy"
                        control={<Checkbox size="smaill" {...field} />}
                      />
                      <FormHelperText>
                        {errors?.acceptTermsConditions?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Button
                  variant="contained"
                  aria-label="Register"
                  sx={{
                    borderRadius: "30px",
                    width: "100%",
                    marginTop: "2.4rem",
                  }}
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                  size="large"
                >
                  Sign in
                </Button>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default SignUp;
