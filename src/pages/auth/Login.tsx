import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { LoginFormType } from "../../lib/types/pages";
import styles from "./Login.module.css";

interface Props {}

const Login = (props: Props) => {
  const classes = useStyles();
  //   const router = useRouter();

  const [tab, setTab] = useState("email");
  const [type, setType] = useState("password");
  const [mobileOff, setMobileOff] = useState(false);

  // react hook form validations
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "nexus.emran@gmail.com",
      password: "123456@A",
      phoneinput: "880",
      mobile: "",
    },
    shouldFocusError: false,
  });

  const watchFields = watch("password");

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.loginWrapper}>
      <div className={styles.blurredScreen}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={12} xs={12}>
              <div className={styles.Login}>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <h4>Login</h4>
                  <p className={styles.p}>
                    Welcome back! Log In with your Email
                  </p>

                  <div className={classes.tabWrapper}>
                    <ul>
                      <li
                        onClick={() => {
                          setTab("email");
                          setMobileOff(false);
                        }}
                        className={tab === "email" ? classes.active : ""}
                      >
                        Email
                      </li>
                      <li
                        onClick={() => {
                          setTab("phone");
                          setMobileOff(true);
                        }}
                        className={tab === "phone" ? classes.active : ""}
                      >
                        Mobile
                      </li>
                    </ul>
                  </div>

                  <div className={`${styles.singleItem} ${styles.firstChild}`}>
                    {tab === "email" ? (
                      <>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required!",
                            pattern:
                              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          }}
                          render={({
                            field: { onChange, value: emailValue },
                          }) => (
                            <TextField
                              id="outlined-basic"
                              label="Email"
                              color="secondary"
                              variant="outlined"
                              focused={true}
                              type="email"
                              required
                              fullWidth={true}
                              value={emailValue}
                              onChange={onChange}
                              className={classes.textInput}
                              autoComplete="email"
                            />
                          )}
                        />
                        {errors.email?.type === "required" && (
                          <p>Email is required</p>
                        )}
                        {errors.email?.type === "pattern" && (
                          <p>Email Pattern is not working </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div className={classes.mobileWrapper}>
                          <div className={classes.code}>
                            <Controller
                              name="phoneinput"
                              control={control}
                              rules={{
                                required: true,
                              }}
                              render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                  value={value}
                                  onChange={onChange}
                                  enableSearch={true}
                                  specialLabel="Country Code"
                                />
                              )}
                            />
                          </div>
                          <Controller
                            name="mobile"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Mobile Number is required" }}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                id="outlined-basic"
                                label="Mobile"
                                color="secondary"
                                variant="outlined"
                                focused={true}
                                value={value}
                                onChange={onChange}
                                fullWidth={true}
                                className={classes.textInput}
                              />
                            )}
                          />
                        </div>
                        {errors.mobile?.type === "required" && (
                          <p>Mobile Number is required</p>
                        )}
                        {/* {!phoneCode && <p>Country Code is required</p>} */}
                        {errors["phoneinput"] && (
                          <p>Country Code is required</p>
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.singleItem}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: true, minLength: 8, maxLength: 20 }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          color="secondary"
                          fullWidth={true}
                          value={value}
                          onChange={onChange}
                          type={type}
                          className={classes.textInput}
                          autoComplete="new-password"
                        />
                      )}
                    />
                    <div
                      className={classes.eye}
                      onClick={() =>
                        setType(type === "text" ? "password" : "text")
                      }
                    >
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </div>

                    {errors.password?.type === "required" && (
                      <p>You must entered your password.</p>
                    )}

                    {/* {errors.password?.type === "minLength" && (
                    <p>Password must be at least 8 characters with 1 upper case
                    letter and 1 number.</p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p>Password should not be more than 20 character.</p>
                  )} */}
                  </div>

                  {/* <div className={styles.singleItem}>
                    <a href="/" className={classes.piriti}>
                      Forgot password?
                    </a>
                  </div> */}

                  <div className={styles.singleItem}>
                    <SubmitButton
                      text="LOG IN"
                      type="submit"
                      //   isLoading={isLoading}
                      //   isDasabled={isLoading}
                    />
                  </div>

                  {/* <div className={styles.singleItem}>
                    <p className={classes.ask}>Don’t have an account?</p>

                    <a
                      href="/"
                      className={classes.piriti}
                      style={{ textAlign: "center" }}
                    >
                      Create Account
                    </a>
                  </div> */}
                </form>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Login;

const useStyles = makeStyles((theme) => {
  return {
    textInput: {},
    loginWrapper: {
      background: "#f5f5fc",
    },
    mobileWrapper: {
      display: "flex",
      gap: "0px 20px",
      "@media (max-width: 424px)": {
        display: "block",
      },
    },
    code: {
      "& > div": {
        width: "auto",
        "@media (max-width: 424px)": {
          width: "100%",
          marginBottom: "30px",
        },
      },
      "& input[type='tel']": {
        width: "130px!important",
        padding: "16.5px 14px 16.5px 58px",
        "@media (max-width: 424px)": {
          width: "100%!important",
        },
      },
    },
    tabWrapper: {
      margin: "25px 0px",
      "& ul": {
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        border: "1px solid #1652f0",
        width: "fit-content",
        "& li": {
          fontSize: "18px",
          fontWeight: 400,
          lineHeight: "28px",
          color: "#5B616E",
          padding: "5px 15px 5px 15px",
          cursor: "pointer",
        },
      },
    },
    active: {
      color: "#fff!important",
      background: "#1652f0",
      borderRadius: "4px",
    },
    eye: {
      position: "absolute",
      right: "12px",
      top: "19px",
      cursor: "pointer",
    },
    piriti: {
      color: "#1652f0!important",
      fontSize: "16px",
      lineHeight: "25px",
      display: "inline-block",
      textAlign: "right",
      textDecoration: "none",
    },
    ask: {
      color: "#0A0B0D!important",
      fontSize: "16px",
      lineHeight: "25px",
      display: "block",
      textAlign: "center",
    },
  };
});
