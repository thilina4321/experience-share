import Image from "next/image";
import classes from "./profle.module.css";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import Experiences from "../experience/experiences";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { user as userSlice } from "../../store/slices/userSlice";

const Profile = () => {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [mySelf, setMySelf] = useState();

  const imageRef = useRef();

  const user = useSelector((state) => state.user.user);
  const allPosts = useSelector((state) => state.posts.posts);

  const posts = allPosts.filter((post) => post.userId == user.id);

  if (!user) {
    router.push("/");
  }

  useEffect(() => {
    if (file) {
      let fileReader = new FileReader();
      fileReader.onload = () => setImage(fileReader.result);
      fileReader.readAsDataURL(file);
      setOpen(true);
    }
  }, [file]);

  useEffect(() => {
    const me = async () => {
      const res = await fetch("/api/me/" + user.id);
      const meName = await res.json();
      setMySelf(meName.user);
      // setPosts(posts.posts)
    };

    if (user && user.id) {
      me();
    }
  }, [user]);

  const onImageHandler = () => {
    imageRef.current.click();
  };

  const onFileChange = (event) => {
    setFile((pre) => event.target.files[0]);
  };

  const onAddHandler = async () => {
    try {
      setLoading(true);
      const userImage = await fetch("/api/user/profile-image", {
        method: "POST",
        body: JSON.stringify({ url: image, id: user.id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!userImage.ok) {
        setOpen(false);
        setLoading(false);
      }

      const resData = await userImage.json();
      dispatch(userSlice.addImage(resData.image));

      setOpen(false);
      setLoading(false);
    } catch (error) {}
  };

  const onCancelHandler = () => {
    setOpen(false);
  };

  const onAddExperience = () => {
    router.push("/experience");
  };

  return (
    <section className={classes.section}>
      <div className={classes.user}>
        {mySelf && mySelf.profileImage != undefined ? (
          <img className={classes.img} src={mySelf.profileImage} />
        ) : (
          <div className={classes.avatar} />
        )}
        <h1 className={classes.h1}> {mySelf && mySelf.userName} </h1>
      </div>

      <input
        className={classes.input}
        onChange={onFileChange}
        ref={imageRef}
        type="file"
        accept="image/*"
      />

      {image && (
        <dialog open={open} className={classes.imageDialog}>
          <div className={classes.profile__pic__dialog}>
            <Image src={image} width={500} height={300} />
            {!loading && <div className={classes.btn}>
              <Button onClick={onCancelHandler}> Cancle </Button>
              <Button onClick={onAddHandler}> ADD Image </Button>
              </div>}
              <div className={classes.btn}>
              {loading && <CircularProgress />}
              </div>
          </div>{" "}
        </dialog>
      )}

      <Button onClick={onImageHandler} color="primary" type="button">
        {" "}
        ADD IMAGE{" "}
      </Button>

      <Button onClick={onAddExperience} color="primary">
        {" "}
        ADD EXPERIENCE{" "}
      </Button>
      <h3> Your Experiences </h3>

      <Experiences posts={posts} user={true} noMargin={true} />
    </section>
  );
};

export default Profile;
