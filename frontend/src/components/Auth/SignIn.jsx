import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import AuthHeader from "./AuthHeader";
import avatar from "../../assets/logo/2.png";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, login } from "../../state/Auth/Action";
import { postFetch } from "../../network";
import { setter } from "../../state/tokenSlice";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  remember: true,
};

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }else{
      dispatch(login)
    }
  }, [jwt, auth.jwt]);
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
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const res = await postFetch('auth/login', userData);
      dispatch(setter(res.token))
      console.log(">>>",res.user.roles.includes('SHOP'))
    } catch (err) {
      console.error(err);  
    }  
  }
  return (
    <>
      <AuthHeader />
      <div className="flex items-center justify-center">
        <div className="flex justify-between w-xl py-28">
          <Box className="mt-3 hidden items-center md:flex w-1/2">
            <div>
              <div>Xin Chao</div>
              <div>Tao la vua</div>
              <div>Dung dong vao tao</div>
              <img
                className="w-full h-128 border-0"
                src={avatar}
                alt="banner"
              />
            </div>
          </Box>
          <Paper
            className="overflow-hidden shadow-sm md:w-[40%] rounded mx-auto py-8 px-16"
            sx={{ bgcolor: "#FCF5ED", borderRadius: "15px" }}
          >
            <div className="px-10 py-10">
              <Typography
                className="mt-32 tracking-tight leading-tight"
                sx={{ fontSize: "2rem", fontWeight: "800" }}
              >
                Sign in
              </Typography>
              <div className="flex items-baseline mt-2 font-medium">
                Dont have an account ?<Link className="ml-2" to="/register">Sign up</Link>
              </div>
              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ marginBottom: "1.5rem" }}
                      label="Email"
                      autoFocus
                      type="Email"
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
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      required
                      fullWidth
                    />
                  )}
                />
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <FormControlLabel
                          label="Remember me"
                          control={<Checkbox size="smaill" {...field} />}
                        />
                      </FormControl>
                    )}
                  />
                  <Link className="font-medium text-[15px]" to="/">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    borderRadius: "30px",
                    marginTop: "2.4rem",
                  }}
                  aria-label="Sign in"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                  size="large"
                >
                  Sign in
                </Button>
                <div className="flex items-center mt-32">
                  <div className="flex-auto mt-px border-t" />
                  <Typography className="mx-8" color="text.secondary">
                    Or continue with
                  </Typography>
                  <div className="flex-auto mt-px border-t" />
                </div>
                <div className="flex items-center mt-32 space-x-16">
                  <Button variant="outlined" className="flex-auto">
                    <FacebookIcon size={20} color="action" />
                  </Button>
                  <Button variant="outlined" className="flex-auto">
                    <GitHubIcon size={20} color="action" />
                  </Button>
                </div>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default SignIn;

