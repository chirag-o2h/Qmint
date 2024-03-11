import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import BlogAndNewsServices from '@/apis/services/blogAndNewsServices'

interface BlogState {
    newsList: {},
    newsDetailsData:{}
    loading: boolean
}
const initialState: BlogState = {
    newsList: {},
    newsDetailsData:{},
    loading: false
}

export const NewsList = appCreateAsyncThunk(
    'NewsList/status',
    async ({ body }: { body: any }) => {
        return await BlogAndNewsServices.NewsList(body)
    }
)
export const NewsDetailsAPI = appCreateAsyncThunk(
    'NewsDetailsAPI/status',
    async ({ params }: { params: any }) => {
        return await BlogAndNewsServices.NewsDetails(params)
    }
)
export const NewsPageSlice = createSlice({
    name: 'NewsPageSlice',
    initialState,
    reducers: {
        resetWholeBlogPageData: (state) => {
            state.newsList = {}
            state.newsDetailsData={}
        },
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
    },

    extraReducers: (builder) => {
        // Get categories list
        builder.addCase(NewsList.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(NewsList.fulfilled, (state, action) => {
            state.newsList = action.payload.data.data
            state.loading = false
        })
        builder.addCase(NewsList.rejected, (state, action) => {
            state.loading = false
        })
        // Get Blog details
        builder.addCase(NewsDetailsAPI.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(NewsDetailsAPI.fulfilled, (state, action) => {
            state.newsDetailsData = action.payload.data.data
            state.loading = false
        })
        builder.addCase(NewsDetailsAPI.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { resetWholeBlogPageData, setLoadingTrue, setLoadingFalse } = NewsPageSlice.actions

export default NewsPageSlice.reducer
