import Button from "@material-ui/core/Button";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./new.exe.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../../hooks/use-http";
import Error from "../../UI/error";
import Success from "../../UI/success";
import { posts } from "../../../store/slices/postsSlice";

const NewExe = () => {
  const labelRef = useRef();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [post, setPost] = useState();

  const [errorOpen, seterrorOpen] = useState(false);
  const [successOpen, setsuccessOpen] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const { sendRequest, loading, error, data } = useHttp();
  const {
    sendRequest: addPostRequest,
    loading: postLoading,
    error: postError,
    data: addPostData,
  } = useHttp();

  const imageRef = useRef();

  const router = useRouter();

  useEffect(() => {
    const applyData = (data) => {
      setImage(data.post.imageUrl);
      labelRef.current.value = data.post.description;
    };
    if (router.query.id) {
      sendRequest({ url: `/api/selectPost?id=${router.query.id}` }, applyData);
    }
  }, [sendRequest]);


  useEffect(() => {
    if (file) {
      let fileReader = new FileReader();
      fileReader.onload = () => setImage(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const postData = (data) => {
    dispatch(posts.editPost({
      ...data.post,
      userImage: user.userImage,
      userName: user.userName,
    }));
  };

  const addPost = (data) => {
    dispatch(
      posts.addPost({
        ...data.post,
        userImage: user.userImage,
        userName: user.userName,
      })
    );
  };

  const dataHandler = async (event) => {
    event.preventDefault();
    const label = labelRef.current.value;

    if (router.query.id) {
      addPostRequest(
        {
          url: "/api/user/posts",
          method: "PATCH",
          body: {
            id: router.query.id,
            imageUrl: image,
            description: label,
            userId: user.id,
            isImageEdit: image != data.post.imageUrl,
          },
        },
        postData
      );
    } else {
      addPostRequest(
        {
          url: "/api/user/posts",
          method: "POST",
          body: {
            imageUrl: image,
            description: label,
            userId: user.id,
          },
        },
        addPost
      );
    }

    if (!postLoading && postError) {
      seterrorOpen(true);
    } else {
      setsuccessOpen(true);
    }
  };

  const onImageHandler = () => {
    imageRef.current.click();
  };

  const onFileChange = (event) => {
    setFile((pre) => event.target.files[0]);
  };

  const onCloseDialog = useCallback(() => {
    setsuccessOpen(false);
    seterrorOpen(false);
  }, []);

  const onNavigate = () => {
    setsuccessOpen(false);
    router.push("/user");
  };

  return (
    <section style={{ width: "100%" }}>
      <form className={classes.section} onSubmit={dataHandler}>
        <label> Experience </label>
        <textarea placeholder="write here" ref={labelRef} rows="6" />

        <input
          className={classes.input}
          onChange={onFileChange}
          ref={imageRef}
          type="file"
          accept="image/*"
        />
        {image && <img className={classes.img} src={image} />}
        <Button onClick={onImageHandler} color="primary" type="button">
          {" "}
          ADD IMAGE{" "}
        </Button>

        {router.query.id ? (
          <Button color="primary" type="submit">
            {" "}
            EDIT{" "}
          </Button>
        ) : (
          <Button color="primary" type="submit">
            {" "}
            SAVE{" "}
          </Button>
        )}

        {postLoading && <CircularProgress />}

        <Success CloseDialog={onNavigate} open={successOpen}></Success>

        <Error CloseDialog={onCloseDialog} open={errorOpen}></Error>
      </form>
    </section>
  );
};

export default NewExe;
