import Link from "next/link";
import classes from "./desktop.module.css";

const Desktop = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}> THILINA </h1>
      <Link href="/">
        <a>
          <p> HOME </p>
        </a>
      </Link>
      <Link href="/skill">
        <a>
          <p> SKILL </p>
        </a>
      </Link>
      <Link href="/education">
        <a>
          <p> EDUCATION </p>
        </a>
      </Link>
      <Link href="/project">
        <a>
          <p> PROJECT </p>
        </a>
      </Link>
      <Link href="/contact">
        <a>
          <p> CONTACT </p>
        </a>
      </Link>
    </header>
  );
};

export default Desktop;
