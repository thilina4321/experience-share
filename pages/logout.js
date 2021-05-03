import { useRouter } from "next/router";
import {  signOut, getSession } from "next-auth/client";

const Logout = (props) => {
  const router = useRouter();

  if (props.session) {
    signOut()
      .then(() => {})
      .catch((e) => console.log(e));
    router.replace("/");
  }

  

  return <div> Logout </div>;
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: {
        session,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
};

export default Logout;
