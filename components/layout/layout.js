import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Desktop from "./desktop";
import MainHeader from "./main-header";
import { getSession, useSession } from "next-auth/client";

import {user} from '../../store/slices/userSlice'

const Layout = (props) => {
  const dispatch = useDispatch();

  const [session] = useSession();

  
  
  useEffect(() => {
    if (session) {
      console.log(session);

      const { image, email, name } = session['user'];
      dispatch(user.addUser({ id: email, userName: name, userImage: image }));
    }
  });
  
  return (
    <div>
      <MainHeader />
      <Desktop />
      {props.children}
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   console.log("context");

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };

export default Layout;
