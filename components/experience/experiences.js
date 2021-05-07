import Experience from "./experience";
import classes from './experience.module.css'



const Experiences = (props) => {
  const {noMargin, posts} = props


  return (
    <div className={classes.div} style={noMargin && {marginTop:0}}>
      {posts.map(({  id, imageUrl, description,userName, userImage }) => (
        <Experience
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
