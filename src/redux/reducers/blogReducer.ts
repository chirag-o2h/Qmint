import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import BlogServices from '@/apis/services/blogAndNewsServices'

interface BlogState {
    blogList: {},
    blogDetailsData:{}
    loading: boolean
    topThree: []
}
const initialState: BlogState = {
    blogList: {},
    blogDetailsData:{},
    loading: false,
    topThree: []
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
            state.topThree = []
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
            if (state.topThree.length < 1) {
                state.topThree = action.payload.data.data.items.slice(0, 3)
            }
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

export const { resetWholeBlogPageData, setLoadingFalse } = blogpageSlice.actions

export default blogpageSlice.reducer
