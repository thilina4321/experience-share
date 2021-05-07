import LinkedCamera from "@material-ui/icons/LinkedCamera";
import Comment from "@material-ui/icons/Comment";
import classes from './experience.module.css'
import {useRouter} from 'next/router'

const Experience = (props) => {
  const { id, description, imageUrl, userName, userImage } = props;
  const router = useRouter()

  return (
    <article onClick={()=>router.push('/post/'+id)}

     className={classes.article}>

      <div className={classes.user}>
        {userImage ? <img className={classes.pro}
          src={userImage}  /> :<div className={classes.avatar} /> }
        <h4 className={classes.h4}> {userName} </h4>
      </div>

      <p> {description} </p>

      <img className={classes.img}
      src={imageUrl}
       />

      

    </article>
  );
};

export default Experience;
