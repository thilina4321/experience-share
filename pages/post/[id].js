import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Experience from "../../components/experience/experience";
import Send from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Comment from "../../components/experience/comment";
import { getSession, useSession } from "next-auth/client";

const PostPage = (props) => {
  const [session, loading] = useSession();
  const commentRef = useRef();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { id } = props.query;
  const posts = useSelector((state) => state.posts.posts);
  let post;
  if (posts) {
    post = posts.find((post) => post.id === id);
  }

  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (id) {
        setisLoading(true);
        const response = await fetch("/api/comment/" + id);
        if (!response.ok) {
          setisLoading(false);
          seterror("Some thing went wrong");
        }
        setisLoading(false);

        const comment = await response.json();
        setcomments(comment.comments);
      }
    };
    fetchComments();
  }, []);

  const onSubmitComment = async (event) => {
    event.preventDefault();

    if (commentRef.current.value == "") return;

    setisLoading(true);
    const response = await fetch("/api/user/comment", {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: id,
        comment: commentRef.current.value,

        owner: session.user.name,
      }),
    });
    if (!response.ok) {
      setisLoading(false);
      seterror("Some thing went wrong");
    }
    setisLoading(false);

    const comment = await response.json();
    setcomments((pre) => [...pre, { ...comment.response }]);
    commentRef.current.value = "";
  };

  return (
    <section
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {post && (
        <Experience
          id={id}
          imageUrl={post.imageUrl}
          description={post.description}
          userName={post.userName}
          userImage={post.userImage}
        />
      )}

      <form
        onSubmit={onSubmitComment}
        style={{ display: "flex", width: "80%", margin: "0 auto" }}
      >
        <textarea
        rows="6"
          ref={commentRef}
          style={{ flex: "1", margin: "5px", 
          padding: "5px" }}
          ref={commentRef}
        
          style={{ width: "80%" }}
          placeholder="Write Here"
        />
        <Button type="submit">
          {isLoading ? <CircularProgress /> : <Send />}
        </Button>
      </form>

      {post &&
        comments.map((comment) => (
          <Comment
            key={comment._id}
            name={comment.owner}
            comment={comment.comment}
          />
        ))}
    </section>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const query = await context.query;

  return {
    props: { query },
  };
};
