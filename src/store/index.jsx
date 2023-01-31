import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loading.slice'
import productsSlice from './slices/products.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        loading: loadingSlice,
        products: productsSlice,
        purchases: purchasesSlice,
    }
})
