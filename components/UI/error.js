import Button from '@material-ui/core/Button'
import classes from './error.module.css'

const Error = (props) => {



    const {CloseDialog, open} = props

    const onCloseDialog = ()=>{
        CloseDialog()
    }

    return (
        <dialog onClick={onCloseDialog} open={open} className={classes.dialog}>
            
            <div style={{ textAlign: "end" }}>
                 <Button color="primary" onClick={onCloseDialog}>
                   {" "}
                   OK{" "}
                 </Button>
               </div>
        </dialog>
    )
}

export default Error
