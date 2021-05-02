import Button from "@material-ui/core/Button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import classes from "./new.exe.module.css";

const NewExe = () => {
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const labelRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
      if (file) {
        console.log('yes');
      let fileReader = new FileReader();
      fileReader.onload = ()=>setImage(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const dataHandler = (event) => {
    event.preventDefault();
    const label = labelRef.current.value;

    console.log(label);
    console.log(image);
  };

  const onImageHandler = () => {
    imageRef.current.click();
  };

  const onFileChange = (event) => {
          setFile(pre=>event.target.files[0]);

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
      </form>
    </section>
  );
};

export default NewExe;
