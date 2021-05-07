const Comments = (props) => {

    const {name, comment} = props
    
    return (
        <div style={{boxShadow:'0 1px 1px 2px rgba(0,0,0,0.26)',padding:'0 15px', margin:'5px'}}>
           <p style={{fontWeight:'bold'}}> {name} </p> 
           <p> {comment} </p>
        </div>
    )
}

export default Comments
