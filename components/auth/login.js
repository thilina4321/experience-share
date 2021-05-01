import {useRouter} from 'next/router'
import { useRef } from "react";
import classes from './login.module.css'
import {Button} from '@material-ui/core'

const Login = () => {

    const router = useRouter()

    const emailRef = useRef()
    const passwordRef = useRef()

    const onLoginHandler = (event)=>{
        event.preventDefault();
        router.replace('/')
        
    }
    return (
        <section className={classes.section}>
                <form className={classes.form} onSubmit={onLoginHandler} >
                    
                    <label htmlFor="email"> Email  </label>
                    <input type="email" id="email" ref={emailRef} />
                    <label htmlFor="password"> Password  </label>
                    <input type="password" id="password" ref={passwordRef} />
                    <Button color="primary"  type="submit" > Log In </Button>
                </form>
            </section>
    )
}

export default Login
