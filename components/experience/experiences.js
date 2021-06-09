import Experience from "./experience";
import classes from './experience.module.css'



const Experiences = (props) => {
  const {noMargin, posts, user = false} = props


  return (
    <div className={classes.div} style={noMargin && {marginTop:0}}>
      {posts.map(({  id, imageUrl, description,userName, userImage }) => (
        <Experience
          user={user}
          key={id}
          id={id}
          userName={userName}
          userImage={userImage}
          description={description}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};

export default Experiences;
