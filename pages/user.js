import Profile from '../components/user/profile'
import {getSession} from 'next-auth/client'

const UserPage = () => {
    return (
        <div>
            <Profile />
        </div>
    )
}

export default UserPage

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
          destination: "/login",
        },
      };
    }
  };
