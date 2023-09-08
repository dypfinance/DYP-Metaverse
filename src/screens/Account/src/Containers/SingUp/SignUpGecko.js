/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";

function SingUpGecko({ onSuccessVerify, onEmailVerify }) {
  const {
    isAuthenticated,
    login: LoginGlobal,
    code,
    loginError,
    setLoginValues,
    playerId,
  } = useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [playerCreation, setplayerCreation] = useState(false);

  const login = () => {
    LoginGlobal(username, password);
  };

  async function verifyEmailValidationCode() {
    await Auth.confirmSignUp(username, verifyCode)
      .then(() => {
        login();
        onEmailVerify(true)
      })
      .catch((e) => {
        console.log("failed with error", e);
      });
  }

  const signup = () => {
    Auth.signUp({
      username,
      password,
    })
      .then((user) => {
        login();
      })
      .catch((err) => {
        console.log(err);
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: err?.message,
          };
        });
      });
  };

  useEffect(() => {
    setLoginValues(() => {
      return {
        isLoginIn: false,
        loginError: null,
      };
    });
  }, []);

  console.log(username, password);

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  useEffect(() => {
    if (loginError) {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: null,
        };
      });
    }
  }, [username, password]);

  if (isAuthenticated) {
    if (!playerId) {
      setplayerCreation(true);
      onSuccessVerify(true);
    }
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
          Users who have claimed the CoinGecko Beta Pass NFT are required to
          create a WoD Account to receive the NFT and participate in the
          exclusive event.
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
      <Input
        placeHolder="Email"
        value={username}
        onChange={setUserName}
        type={"coingecko"}
      />
      <Input
        inputType="password"
        placeHolder="Password"
        value={password}
        onChange={setPassword}
        type={"coingecko"}
      />
      <Input
        inputType="password"
        placeHolder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type={"coingecko"}
      />

      <span className="footertxt-coingecko mt-4">
        Users who have claimed the CoinGecko Beta Pass NFT are required to
        create a WoD Account to receive the NFT and participate in the exclusive
        event.
      </span>

      <div className="summaryseparator"></div>

      <Button
        disabled={disabled}
        onPress={signup}
        title={"Continue  >"}
        type={"coingecko"}
      />
    </div>
  );
}

export default SingUpGecko;