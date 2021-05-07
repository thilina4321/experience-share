import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Experience from "../../components/experience/experience";
import { posts as postSlice } from "../../store/slices/postsSlice";
import { useSession } from "next-auth/client";
import { useDispatch } from "react-redux";
import Send from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Comment from "../../components/experience/comment";

const PostPage = (props) => {
  const [session] = useSession();
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { id } = props.query;
  const posts = useSelector((state) => state.posts.posts);
  const { imageUrl, userName, userImage, description } = posts.find(
    (post) => post.id === id
  );

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

        const comment = await response.json();
        setcomments(comment.comments)
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

    const comment = await response.json();
    console.log(comment);
    //   dispatch(postSlice.addComment(comment))
  };

  return (
    <section style={{ marginTop: "100px" }}>
      <Experience
        id={id}
        imageUrl={imageUrl}
        description={description}
        userName={userName}
        userImage={userImage}
      />
      <form onSubmit={onSubmitComment} style={{ display: "flex" }}>
        <textarea
          ref={commentRef}
          style={{ flex: "1" }}
          ref={commentRef}
          style={{ width: "100%" }}
          placeholder="Write Here"
        />
        <Button type="submit">
          {" "}
          <Send />{" "}
        </Button>
      </form>

      {comments.map(comment=> <Comment key={comment.id} name={comment.owner} comment={comment.comment} /> )}
      
    </section>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const query = await context.query;

  return {
    props: { query },
  };
};
