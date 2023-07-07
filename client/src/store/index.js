import { configureStore } from '@reduxjs/toolkit'
import cities from './slices/podcast'

export default configureStore({
  reducer: {
    cities
  }
})
