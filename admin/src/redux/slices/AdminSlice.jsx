import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { action } from 'src/theme/palette';

// GET DATA
export const getAllPets = createAsyncThunk('admin/getAllPets', async () => {
  const response = await axios.get('http://localhost:7070/pets');
  return response.data;
});

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async () => {
  const response = await axios.get('http://localhost:7070/users');
  return response.data;
});

export const getAllNews = createAsyncThunk('admin/getAllNews', async () => {
  const response = await axios.get('http://localhost:7070/news');
  return response.data;
});

export const getAllProducts = createAsyncThunk('admin/getAllProducts', async () => {
  const response = await axios.get('http://localhost:7070/products');
  return response.data;
});

//DELETE DATA
export const deletePet = createAsyncThunk('admin/deletePet', async (petId) => {
  const response = await axios.delete(`http://localhost:7070/pets/${petId}`);
  return response.data;
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId) => {
  const response = await axios.delete(`http://localhost:7070/users/${userId}`);
  return response.data;
});

export const deleteNews = createAsyncThunk('admin/deleteNews', async (newsId) => {
  const response = await axios.delete(`http://localhost:7070/news/${newsId}`);
  return response.data;
});

export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (prodId) => {
  const response = await axios.delete(`http://localhost:7070/products/${prodId}`);
  return response.data;
});
//POST DATA
export const postPet = createAsyncThunk('admin/postPet', async (newPet) => {
  const response = await axios.post('http://localhost:7070/pets', newPet);
  return response.data;
});

export const postUser = createAsyncThunk('admin/postUser', async (newUser) => {
  const response = await axios.post('http://localhost:7070/users', newUser);
  return response.data;
});

export const postNews = createAsyncThunk('admin/postNews', async (newNews) => {
  const response = await axios.post('http://localhost:7070/news', newNews);
  return response.data;
});

export const postProduct = createAsyncThunk('admin/postProduct', async (newProd) => {
  const response = await axios.post('http://localhost:7070/products', newProd);
  return response.data;
});

export const patchNews = createAsyncThunk('admin/patchNews', async ({ newsId, updates }) => {
  console.log('Updates:', updates);
  const response = await axios.patch(`http://localhost:7070/news/${newsId}`, updates);
  return response.data;
});

export const patchPet = createAsyncThunk('admin/patchPet', async ({ petId, updates }) => {
  console.log(
    "sliceeeeeee",petId,updates
  )

  const response = await axios.patch(`http://localhost:7070/pets/${petId}`, updates);
  return response.data;

});

export const putUser = createAsyncThunk('admin/putUser', async ({ userId, newObj }) => {
  console.log('newObj:', newObj);
  const response = await axios.put(`http://localhost:7070/users/${userId}`, newObj);
  return response.data;
});

export const putProduct = createAsyncThunk('admin/putProduct', async ({ prodId, newObj }) => {
  console.log('newObj:', newObj);
  const response = await axios.put(`http://localhost:7070/products/${prodId}`, newObj);
  return response.data;
});

export const putNews = createAsyncThunk('admin/putNews', async ({ newsId, newObj }) => {
  console.log('newObj:', newObj);
  const response = await axios.put(`http://localhost:7070/news/${newsId}`, newObj);
  return response.data;
});

const initialState = {
  users: [],
  dogs: [],
  products: [],
  news: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    //   console.log("state",)
    handleDeleteUser: (state, action) => {
      state.users = [...state.users.filter((user) => user._id !== action.payload)];
      console.log('STATEE', state.users);
    },
    handleDeleteProduct: (state, action) => {
      state.products = [...state.products.filter((prod) => prod._id !== action.payload)];
    },
    handleDeleteNews: (state, action) => {
      state.news = [...state.news.filter((news) => news._id !== action.payload)];
    },
    handleDeletePet: (state, action) => {
      state.dogs = [...state.dogs.filter((dog) => dog._id !== action.payload)];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllPets.fulfilled, (state, action) => {
      state.dogs = action.payload;
      // console.log("state", state.data);
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(deletePet.fulfilled, (state, action) => {
      state.data = state.data.filter((elem) => elem._id != action.payload);
      console.log('deleted data', state.data);
      // console.log("state", state.data);
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((elem) => elem._id != action.payload);
      console.log('deleted user', state.users);
    });

    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.news = state.news.filter((elem) => elem._id != action.payload);
      console.log('deleted news', state.news);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((elem) => elem._id != action.payload);
    });

    builder.addCase(postPet.fulfilled, (state, action) => {
      state.data.push(action.payload);
      console.log('posted data', state.data);
      // console.log("state", state.data);
    });

    builder.addCase(postUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      console.log('posted user', state.users);
    });

    builder.addCase(postNews.fulfilled, (state, action) => {
      state.news.push(action.payload);
      console.log('posted news', state.news);
    });

    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { handleDeleteUser, handleDeleteProduct, handleDeleteNews, handleDeletePet } =
  adminSlice.actions;

export default adminSlice.reducer;
