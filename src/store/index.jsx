import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loading.slice'
import productsSlice from './slices/products.slice'

export default configureStore({
    reducer: {
        loading: loadingSlice,
        products: productsSlice,
    }
})
