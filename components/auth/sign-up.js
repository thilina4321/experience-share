import { useRouter } from "next/router";
import { useRef, useState } from "react";
import classes from "./login.module.css";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const Singup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ error: false, msg: "" });

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();

  const onLoginHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userName = userNameRef.current.value;

    try {
      setIsLoading(true);
      const user = await fetch("http://localhost:3000/api/auth/signup-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName, password }),
      });

      setIsLoading(false);

      if (user.status == 200) {
        setIsError({ error: true, msg: "Email already taken" });
      }

      if (!user.ok) {
        setIsError({ error: true, msg: "Please check entered data is correct or try again later" });
        
      }

      if(user.ok){
        emailRef.current.value = ''
        passwordRef.current.value = ''
        userNameRef.current.value = ''
        router.replace('/')
      }
    } catch (error) {
      setIsLoading({ error: false, msg: "" });
    }
  };

  const dialogHandler = () => {
      setIsError({error:false, msg:''})
  };

  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={onLoginHandler}>
        <label htmlFor="userName"> User Name </label>
        <input type="text" id="userName" ref={userNameRef} />
        <label htmlFor="email"> Email </label>
        <input type="email" id="email" ref={emailRef} />
        <label htmlFor="password"> Password </label>
        <input type="password" id="password" ref={passwordRef} />
        <Button color="primary" type="submit">
          {" "}
          Log In{" "}
        </Button>
        <div style={{textAlign:'center'}}>
            {isLoading && <CircularProgress color="secondary" />}
        </div>

        <dialog className={classes.dialog} open={isError.error}>
          <div style={{textAlign:'center'}}>
            <p> {isError.msg} </p>
            <Button color="primary" onClick={dialogHandler} > ok </Button>{" "}
          </div>
        </dialog>
      </form>
    </section>
  );
};

export default Singup;
