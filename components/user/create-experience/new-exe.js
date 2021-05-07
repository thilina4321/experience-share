import Button from "@material-ui/core/Button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./new.exe.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const NewExe = () => {
  const labelRef = useRef();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  const imageRef = useRef();

  console.log(user);

  const router = useRouter();

  useEffect(() => {
    if (file) {
      console.log("yes");
      let fileReader = new FileReader();
      fileReader.onload = () => setImage(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const dataHandler = async (event) => {
    event.preventDefault();
    const label = labelRef.current.value;

    setLoading(true);
    const addPost = await fetch("/api/user/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: image,
        description: label,
        userId: user.id,
      }),
    });

    setLoading(false);
    if (!addPost.ok) {
      setError("Sorry this action is failed");
    } else {
      setSuccess("Post successfully added");
      labelRef.current.value = "";
      setImage("");
    }

    const res = await addPost.json();
    console.log(res);
  };

  const onImageHandler = () => {
    imageRef.current.click();
  };

  const onFileChange = (event) => {
    setFile((pre) => event.target.files[0]);
  };

  const onCloseDialog = () => {
    setError("");
  };

  const onNavigate = () => {
    setSuccess("");
    router.push("/user");
  };

  return (
    <section>
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
        {image && <Image src={image} width={500} height={300} />}
        <Button onClick={onImageHandler} color="primary" type="button">
          {" "}
          ADD IMAGE{" "}
        </Button>
        <Button color="primary" type="submit">
          {" "}
          SAVE{" "}
        </Button>

        {loading && <CircularProgress />}

        {success && (
          <dialog open className={classes.sDialog}>
            {" "}
            <div>
              <p> {success} </p>
              <div style={{ textAlign: "end" }}>
                <Button color="primary" onClick={onNavigate}>
                  {" "}
                  OK{" "}
                </Button>
              </div>
            </div>{" "}
          </dialog>
        )}
        {error && (
          <dialog open className={classes.eDialog}>
            {" "}
            <div>
              <p> {error} </p>
              <div style={{ textAlign: "end" }}>
                <Button color="primary" onClick={onCloseDialog}>
                  {" "}
                  OK{" "}
                </Button>
              </div>
            </div>{" "}
          </dialog>
        )}
      </form>
    </section>
  );
};

export default NewExe;
