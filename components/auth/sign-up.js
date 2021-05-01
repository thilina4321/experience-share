import {useRouter} from 'next/router'
import { useRef } from "react";
import classes from './login.module.css'
import {Button} from '@material-ui/core'

const Singup = () => {

    const router = useRouter()

    const emailRef = useRef()
    const passwordRef = useRef()
    const userNameRef = useRef()

    const onLoginHandler = (event)=>{
        event.preventDefault();
        router.replace('/')
        
    }
    return (
        <section className={classes.section}>
                <form className={classes.form} onSubmit={onLoginHandler} >
                    <label htmlFor="userName"> User Name  </label>
                    <input type="text" id="userName" ref={userNameRef} />
                    <label htmlFor="email"> Email  </label>
                    <input type="email" id="email" ref={emailRef} />
                    <label htmlFor="password"> Password  </label>
                    <input type="password" id="password" ref={passwordRef} />
                    <Button color="primary"  type="submit" > Log In </Button>
                </form>
            </section>
    )
}

export default Singup
