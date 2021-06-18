import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Desktop from "./desktop";
import MainHeader from "./main-header";
import { getSession, useSession } from "next-auth/client";
import { posts as postSlice } from "../../store/slices/postsSlice";

import { user } from "../../store/slices/userSlice";

const Layout = (props) => {
  const dispatch = useDispatch();

  const [session] = useSession();

  useEffect(() => {
    const fetchExperiences = async () => {
      const userPosts = [];
      const res = await fetch("/api/user/posts");
      
      if(!res.ok){
        return
      }

      const posts = await res.json();

      if(posts && posts.posts){
        posts.posts.forEach((element) => {
          userPosts.push({
            id: element._id,
            description: element.description,
            imageUrl: element.imageUrl,
            userId: element.userId._id,
            userName: element.userId.userName,
            userImage: element.userId.profileImage,
          });
        });
      }
      

      dispatch(postSlice.allPosts(userPosts));
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    if (session) {
      const { image, email, name } = session["user"];
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

export default Layout;

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
