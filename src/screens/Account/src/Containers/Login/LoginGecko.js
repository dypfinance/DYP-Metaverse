/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./Login.module.css";
import { ErrorAlert } from "../../Components";

function LoginGecko({ mintTitle, onSuccessLogin, newEmail }) {
  const {
    isAuthenticated,
    login: LoginGlobal,
    loginError,
    code,
    setLoginValues,
    isLoginIn,
  } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [disabled, setDisabled] = useState(false);

  const login = async () => {
    await LoginGlobal(username, password);
  };

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  useEffect(() => {
    setUserName(newEmail)
  }, []);
  

  useEffect(() => {
    if (loginError) {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: null,
        };
      });
    }
  }, [username, password, verifyCode]);

  
  if (isAuthenticated) {
  onSuccessLogin()
  }

  async function verifyEmailValidationCode() {
    await Auth.confirmSignUp(username, verifyCode)
      .then(() => {
        login();
      })
      .catch((e) => {
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: e?.message,
          };
        });
      });
  }

  if (code === "UserNotConfirmedException") {
    return (
      <div className={classes.containergecko}>
        <span className={classes.createplayertxt}>
          *The verification code has been sent to your email address.
        </span>
        <Input
          type={"coingecko"}
          placeHolder="Verify"
          value={verifyCode}
          onChange={setVerifyCode}
        />
        <span className="footertxt-coingecko mt-4">
          Users who have claimed the {mintTitle} NFT are required to create a
          WoD Account to receive the NFT and participate in the exclusive event.
        </span>
        <div className="summaryseparator"></div>

        <Button
          disabled={disabled}
          onPress={verifyEmailValidationCode}
          title={"Continue  >"}
          type={"coingecko"}
        />
      </div>
    );
  }

  return (
    <div className={classes.containergecko}>
      <span className={classes.createplayertxt}>
        *You already have an account. Please login to view details.
      </span>
      <Input
        type={"coingecko"}
        placeHolder="Email"
        value={username}
        onChange={setUserName}
      />
      <Input
        type={"coingecko"}
        inputType="password"
        placeHolder="Password"
        value={password}
        onChange={setPassword}
      />
      <span className="footertxt-coingecko mt-4">
        Users who have claimed the {mintTitle} NFT are required to create a WoD
        Account to receive the NFT and participate in the exclusive event.
      </span>

      <div className="summaryseparator"></div>
      <Button
        disabled={disabled}
        onPress={login}
        loading={isLoginIn}
        title={"Continue  >"}
        type={"coingecko"}
      />
      <Link className={classes.forgotPasswordText} to="/forgotPassword">
        <span>Forgot your password?</span>
      </Link>
      <ErrorAlert error={loginError} />
    </div>
  );
}

export default LoginGecko;
