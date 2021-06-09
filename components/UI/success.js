import Button from '@material-ui/core/Button'
import classes from './error.module.css'

const Success = (props) => {



    const {CloseDialog, open} = props

    const onCloseDialog = ()=>{
        CloseDialog()
    }

    return (
        <dialog onClick={onCloseDialog} open={open} className={classes.dialog}>
            <p> Request succeed </p>
            <div style={{ textAlign: "end" }}>
                 <Button color="primary" onClick={onCloseDialog}>
                   OK
                 </Button>
               </div>
        </dialog>
    )
}

export default Success
