import {configureStore} from '@reduxjs/toolkit'

// reducers
import userSlice from './slices/userSlice'
import postSlice from './slices/postsSlice'

export default configureStore({
    reducer:{
        user:userSlice,
        posts:postSlice
    }
})