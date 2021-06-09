import classes from './experience.module.css'
import {useRouter} from 'next/router'
import Button  from "@material-ui/core/Button";
import { useDispatch } from "react-redux";

import {posts} from '../../store/slices/postsSlice'

const Experience = (props) => {
  const { id, description, imageUrl, userName, userImage, user } = props;
  const router = useRouter()
  const dispatch = useDispatch()

  const editPost = (id)=>{
    router.push('/experience?id='+id)
  }

  const deletePost = async(id)=>{
    const res = await fetch('/api/user/posts?id='+id, {
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      
    })
    if(!res.ok){
      console.log('Error');
      return
    }
    const resData = await res.json()
    console.log(resData);
    dispatch(posts.deletePost({id}))
  }

  return (
    <article 

     className={classes.article}>

      <div className={classes.user}>
        {userImage ? <img className={classes.pro}
          src={userImage}  /> :<div className={classes.avatar} /> }
        <h4 className={classes.h4}> {userName} </h4>
      </div>

      <p> {description} </p>

      <img className={classes.img} onClick={()=>router.push('/post/'+id)}
      src={imageUrl}
       />

      { user && <div className={classes.user__buttons}>
       <Button onClick={()=>editPost(id)} color="primary"> Edit </Button>
       <Button onClick={()=>deletePost(id)} color="secondary"> Remove </Button>
       </div>}

      

    </article>
  );
};

export default Experience;
