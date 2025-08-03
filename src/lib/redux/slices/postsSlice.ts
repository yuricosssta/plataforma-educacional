import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '@/types/IPost';
import axiosInstance from '@/lib/api/axiosInstance'; // Usaremos a instância configurada

interface PostsState {
  posts: IPost[];
  currentPost: IPost | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  status: 'idle',
  error: null,
};

// Thunks para operações assíncronas da API
export const fetchPosts = createAsyncThunk<IPost[]>('posts/fetchPosts', async () => {
  const response = await axiosInstance.get('/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk<IPost, string>('posts/fetchPostById', async (_id) => {
  const response = await axiosInstance.get(`/posts/${_id}`);
  return response.data;
});

export const createNewPost = createAsyncThunk<IPost, Omit<IPost, '_id'>>('posts/createNewPost', async (newPost) => {
  const response = await axiosInstance.post('/posts', newPost);
  return response.data;
});

export const updatePost = createAsyncThunk<IPost, IPost>('posts/updatePost', async (post) => { 
  const response = await axiosInstance.put(`/posts/${post._id}`, post);
  return response.data;
});

export const deletePost = createAsyncThunk<string, string>('posts/deletePost', async (_id) => {
  await axiosInstance.delete(`/posts/${_id}`);
  return _id;
});


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch Single Post
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<IPost>) => {
          state.currentPost = action.payload;
      })
      // Create Post
      .addCase(createNewPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.posts.push(action.payload);
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        const index = state.posts.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter(p => p._id !== action.payload);
      });
  },
});

export default postsSlice.reducer;