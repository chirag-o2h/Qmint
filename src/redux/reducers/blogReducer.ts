import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import BlogServices from '@/apis/services/blogAndNewsServices'

interface BlogState {
    blogList: {},
    blogDetailsData:{}
    loading: boolean
}
const initialState: BlogState = {
    blogList: {},
    blogDetailsData:{},
    loading: false
    // blogList: JSON.parse(localStorage.getItem("blogList") ?? '{}'),
    // blogDetailsData: JSON.parse(localStorage.getItem("blogDetailsData") ?? '{}'),
    // loading: false
}

export const BlogList = appCreateAsyncThunk(
    'BlogList/status',
    async ({ body }: { body: any }) => {
        return await BlogServices.BlogList(body)
    }
)
export const BlogDetailsAPI = appCreateAsyncThunk(
    'BlogDetails/status',
    async ({ params }: { params:{pathName: 'string'} }) => {
        return await BlogServices.BlogDetails(params?.pathName)
    }
)
export const blogpageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        resetWholeBlogPageData: (state) => {
            state.blogList = {}
            state.blogDetailsData={}
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
        builder.addCase(BlogList.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(BlogList.fulfilled, (state, action) => {
            state.blogList = action.payload.data.data
            state.loading = false
        })
        builder.addCase(BlogList.rejected, (state, action) => {
            state.loading = false
        })
        // Get Blog details
        builder.addCase(BlogDetailsAPI.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(BlogDetailsAPI.fulfilled, (state, action) => {
            state.blogDetailsData = action.payload.data.data
            state.loading = false
        })
        builder.addCase(BlogDetailsAPI.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { resetWholeBlogPageData, setLoadingTrue, setLoadingFalse } = blogpageSlice.actions

export default blogpageSlice.reducer
