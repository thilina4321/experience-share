import Image from 'next/image'
import classes from './profle.module.css'

import Button from '@material-ui/core/Button'

import Experiences from '../experience/experiences'

const Profile = () => {
    return (
        <section className={classes.section}>
            <div className={classes.user}>
                <Image className={classes.img}
                 src="/kate-darmody-Ux1rd5Unk1k-unsplash.jpg" width={110} height={120} />
                <h1 className={classes.h1}> Thilina Dilshan </h1>
            </div>

            <Button> ADD IMAGE </Button>

            <Button> ADD EXPERIENCE </Button>
            <h3> Your Experiences </h3>

            <Experiences noMargin={true} />
            

        </section>
    )
}

export default Profile
