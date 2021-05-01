import Image from "next/image";
import { Comment, LinkedCamera } from "@material-ui/icons";
import classes from './experience.module.css'

const Experience = (props) => {
  const { user, id, userImage, description, imageUrl } = props;

  console.log(props);
  return (
    <article className={classes.article}>

    

      <div className={classes.user}>
        <Image className={classes.img} src={userImage} width={50} height={50} />
        <h4 className={classes.h4}> {user} </h4>
      </div>

      <p> {description} </p>

      <Image src={imageUrl} width={500} height={300} />

      <div className={classes.bottom}>
        <LinkedCamera />
        <Comment />
      </div>

    </article>
  );
};

export default Experience;
