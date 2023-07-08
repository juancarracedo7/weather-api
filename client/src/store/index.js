import { configureStore } from '@reduxjs/toolkit'
import cities from './slices/cities'

export default configureStore({
  reducer: {
    cities
  }
})
