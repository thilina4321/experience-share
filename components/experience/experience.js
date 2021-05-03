import Image from "next/image";
import LinkedCamera from "@material-ui/icons/LinkedCamera";
import Comment from "@material-ui/icons/Comment";
import classes from './experience.module.css'

const Experience = (props) => {
  const { user, _id, description, imageUrl } = props;
  const {profileImage, userName} = user

  console.log(profileImage);
  return (
    <article className={classes.article}>

    

      <div className={classes.user}>
        {profileImage ? <img className={classes.pro}
          src={profileImage}  /> :<div className={classes.avatar} /> }
        <h4 className={classes.h4}> {userName} </h4>
      </div>

      <p> {description} </p>

      <img className={classes.img}
      src={imageUrl}
       />

      <div className={classes.bottom}>
        <LinkedCamera />
        <Comment />
      </div>

    </article>
  );
};

export default Experience;
