import { useRef, useState } from "react";
import classes from "./login.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

import { signIn } from "next-auth/client";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const onLoginHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // router.replace('/')

    if (!email || !password) {
      setError("please enter required data");
      return;
    }

    setIsLoading(true);
    const user = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log(user);
    setIsLoading(false);
    if (!user) {
      setError(user.error);
      return;
    }

    router.replace("/");
  };

  const errorCancleHandler = () => {
    setError("");
  };
  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={onLoginHandler}>
        <label htmlFor="email"> Email </label>
        <input type="email" id="email" ref={emailRef} />
        <label htmlFor="password"> Password </label>
        <input type="password" id="password" ref={passwordRef} />
        <Button color="primary" type="submit">
          {" "}
          Log In{" "}
        </Button>

        {isLoading && <CircularProgress />}

        <dialog className={classes.dialog} open={error}>
          <div> {error} </div>
          <div style={{ textAlign: "end" }}>
            <Button color="primary" onClick={errorCancleHandler}>
              {" "}
              Ok{" "}
            </Button>
          </div>
        </dialog>
      </form>
    </section>
  );
};

export default Login;
