import { useSession } from "next-auth/client";
import Link from "next/link";
import classes from "./desktop.module.css";

const Desktop = () => {
  const [session, loading] = useSession();
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}> Experiences </h1>

      {!session ? (
        <div className={classes.elements}>
          
          <Link href="/login">
            <a>
              <p> LOG IN </p>
            </a>
          </Link>
          <Link href="/sign-up">
            <a>
              <p> SIGN UP </p>
            </a>
          </Link>
        </div>
      ) : (
        <div className={classes.elements}>
          <Link href="/">
            <a>
              <p> EXPERIENCES </p>
            </a>
          </Link>

          <Link href="/user">
            <a>
              <p> USER </p>
            </a>
          </Link>
          <Link href="/logout">
            <a>
              <p> LOG OUT </p>
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Desktop;
