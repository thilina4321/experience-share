import NewExe from '../components/user/create-experience/new-exe'
const Experience = () => {
    return (
        <div>
            <NewExe />
        </div> 
    )
}

export default Experience

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
