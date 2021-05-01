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

const Experiences = () => {
  return (
    <div className={classes.div}>
      {experiences.map(({ user, id, userImage, description, imageUrl }) => (
        <Experience
          key={id}
          user={user}
          userImage={userImage}
          description={description}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};

export default Experiences;
