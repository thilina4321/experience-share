import Experience from "./experience";
import classes from './experience.module.css'
const experiences = [
  {
    id: 1,
    user: "thilina",
    userImage: "/kate-darmody-Ux1rd5Unk1k-unsplash.jpg",
    description:
      "This is a very good place. I saw so many things from this places",
    imageUrl: "/kate-darmody-Ux1rd5Unk1k-unsplash.jpg",
  },
  
];

const Experiences = (props) => {
  const {noMargin, posts} = props

  console.log(posts);

  return (
    <div className={classes.div} style={noMargin && {marginTop:0}}>
      {posts.map(({  _id, imageUrl, description,userId }) => (
        <Experience
          key={_id}
          user={userId}
          description={description}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};

export default Experiences;
