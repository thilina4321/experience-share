import {useRouter} from 'next/router'
import { useRef } from "react";
import classes from './login.module.css'
import Button from '@material-ui/core/Button'

import {signIn, signOut, useSession} from 'next-auth/client'


const Login = () => {

    const router = useRouter()
    const [data, isLoading] =  useSession()
    console.log(data);
    const emailRef = useRef()
    const passwordRef = useRef()

    const onLoginHandler = async(event)=>{
        event.preventDefault();
        const email = emailRef.current.value
        const password = passwordRef.current.value
        // router.replace('/')
        

        const user = await signIn('credentials', {redirect:false, email, password})
        console.log(user);

        
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
