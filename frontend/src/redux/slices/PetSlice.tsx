import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// GET DATA
export const getAllPets = createAsyncThunk("pet/getAllPets", async () => {
  const response = await axios.get("https://petsdbs.vercel.app/pets");
  return response.data;
});

export const getAllUsers = createAsyncThunk("pet/getAllUsers", async () => {
  const response = await axios.get("https://petsdbs.vercel.app/users");
  return response.data;
});

export const getAllNews = createAsyncThunk("pet/getAllNews", async () => {
  const response = await axios.get("https://petsdbs.vercel.app/news");
  return response.data;
});

export const getAllProducts = createAsyncThunk(
  "pet/getAllProducts",
  async () => {
    const response = await axios.get("https://petsdbs.vercel.app/products");
    return response.data;
  }
);

export const getAllMessages = createAsyncThunk(
  "pet/getAllMessages",
  async () => {
    const response = await axios.get("https://petsdbs.vercel.app/messages");
    return response.data;
  }
);

//DELETE DATA
export const deleteEmail = createAsyncThunk(
  "pet/deleteEmail",
  async (emailId) => {
    const response = await axios.delete(
      `https://petsdbs.vercel.app/emails/${emailId}`
    );
    return response.data;
  }
);

export const deletePet = createAsyncThunk("pet/deletePet", async (petId) => {
  const response = await axios.delete(`https://petsdbs.vercel.app/pets/${petId}`);
  return response.data;
});

export const deleteUser = createAsyncThunk("pet/deleteUser", async (userId) => {
  const response = await axios.delete(`https://petsdbs.vercel.app/users/${userId}`);
  return response.data;
});

export const deleteNews = createAsyncThunk("pet/deleteNews", async (newsId) => {
  const response = await axios.delete(`https://petsdbs.vercel.app/news/${newsId}`);
  return response.data;
});

export const deleteProduct = createAsyncThunk(
  "pet/deleteProduct",
  async (prodId) => {
    const response = await axios.delete(
      `https://petsdbs.vercel.app/prooducts/${prodId}`
    );
    return response.data;
  }
);
//POST DATA
export const postEmail = createAsyncThunk("pet/postEmail", async (newEmail) => {
  const response = await axios.post("https://petsdbs.vercel.app/emails", newEmail);
  return response.data;
});

export const postMessage = createAsyncThunk(
  "pet/postMessage",
  async (newMess) => {
    const response = await axios.post(
      "https://petsdbs.vercel.app/messages",
      newMess
    );
    return response.data;
  }
);

export const postPet = createAsyncThunk("pet/postPet", async (newPet) => {
  const response = await axios.post("https://petsdbs.vercel.app/pets", newPet);
  return response.data;
});

export const postUser = createAsyncThunk("pet/postUser", async (newUser) => {
  const response = await axios.post("https://petsdbs.vercel.app/users", newUser);
  return response.data;
});

export const postNews = createAsyncThunk("pet/postNews", async (newNews) => {
  const response = await axios.post("https://petsdbs.vercel.app/news", newNews);
  return response.data;
});

export const postProduct = createAsyncThunk(
  "pet/postProduct",
  async (newProd) => {
    const response = await axios.post(
      "https://petsdbs.vercel.app/products",
      newProd
    );
    return response.data;
  }
);

export const patchNews = createAsyncThunk(
  "pet/patchNews",
  async ({ newsId, updates }: { newsId: string; updates: any }) => {
    console.log("Updates:", updates);
    const response = await axios.patch(
      `https://petsdbs.vercel.app/news/${newsId}`,
      updates
    );
    return response.data;
  }
);

export const putUser = createAsyncThunk(
  "pet/putUser",
  async ({ userId, newObj }: { userId: string; newObj: any }) => {
    console.log("newObj:", newObj);
    const response = await axios.put(
      `https://petsdbs.vercel.app/users/${userId}`,
      newObj
    );
    return response.data;
  }
);

export interface PetState {
  value: number;
  data: object[];
  users: object[];
  news: object[];
  products: object[];
  basket: object[];
  adopts: object[];
  messages: object[];
}

// const userString = localStorage.getItem("user");
// const user = userString ? JSON.parse(userString) : {};
// console.log("USER", user);

const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : {};
};

const initialState: PetState = {
  value: 0,
  data: [],
  users: [],
  news: [],
  products: [],
  basket: getUserFromLocalStorage().basket || [],
  adopts: getUserFromLocalStorage().adopts || [],
  messages: [],
};

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    handleAdopt: (state, action) => {
      const findIndex = state.adopts.findIndex(
        (item: any) => item._id === action.payload._id
      );

      if (findIndex === -1) {
        state.adopts.push({ ...action.payload });
      } else {
        state.adopts.filter((elem: any) => elem._id != action.payload._id);
      }

      const user = getUserFromLocalStorage();
      user.adopts = state.adopts;
      localStorage.setItem("user", JSON.stringify(user));
    },
    handleDeleteAdopt: (state, action) => {
      state.adopts = state.adopts.filter(
        (bas: any) => bas._id !== action.payload._id
      );

      const user = getUserFromLocalStorage();
      user.adopts = state.adopts;
      localStorage.setItem("user", JSON.stringify(user));
    },
    handleBasket: (state, action) => {
      const { payload } = action;
      const findIndex = state.basket.findIndex(
        (item: any) => item._id === payload._id
      );

      if (findIndex === -1) {
        // Item not found in basket, add it with count 1
        state.basket.push({ ...payload, count: 1 });
      } else {
        // Item found in basket, increment its count
        state.basket[findIndex].count++;
      }

      // Update basket in local storage
      const user = getUserFromLocalStorage();
      user.basket = state.basket;
      localStorage.setItem("user", JSON.stringify(user));
    },

    handleCheckout: (state, actions) => {
      const userr = JSON.parse(localStorage.getItem("user") || "{}");
      const userBasket = userr.basket;
      const userAdopts = userr.adopts;
      let subTotal = 0;

      userBasket.forEach((item: any) => {
        subTotal += item.count * item.price;
      });

      userAdopts.forEach((item: any) => {
        if (item.price == "Free") {
          subTotal += 0;
        } else {
          subTotal += +item.price;
        }
      });

      // Assuming user's balance is enough for the order
      userr.orders = [...userr.orders, ...userBasket, ...userAdopts];
      userr.balance -= subTotal;
      state.basket = [];
      state.adopts = [];
      userr.basket = [...state.basket];
      userr.adopts = [...state.adopts];

      // Update user data in local storage
      localStorage.setItem("user", JSON.stringify(userr));
    },

    handleMinus: (state, action) => {
      let find: any = state.basket.find(
        (elem: any) => elem._id == action.payload._id
      );
      if (find.count > 1) {
        find.count--;
      } else {
        state.basket = state.basket.filter(
          (elem: any) => elem._id !== find._id
        );
      }

      const user = getUserFromLocalStorage();
      user.basket = state.basket;
      localStorage.setItem("user", JSON.stringify(user));
    },

    handlePlus: (state, action) => {
      let find: any = state.basket.find(
        (elem: any) => elem._id == action.payload._id
      );
      find.count++;

      const user = getUserFromLocalStorage();
      user.basket = state.basket;
      localStorage.setItem("user", JSON.stringify(user));
    },

    handleDelete: (state, action) => {
      state.basket = state.basket.filter(
        (bas: any) => bas._id !== action.payload._id
      );

      const user = getUserFromLocalStorage();
      user.basket = state.basket;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },

  // EXTRA REDUCER
  extraReducers: (builder) => {
    builder.addCase(getAllPets.fulfilled, (state, action) => {
      state.data = action.payload;
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

    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });

    builder.addCase(deletePet.fulfilled, (state, action) => {
      state.data = state.data.filter((elem: any) => elem._id != action.payload);
      console.log("deleted data", state.data);
      // console.log("state", state.data);
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (elem: any) => elem._id != action.payload
      );
      console.log("deleted user", state.users);
    });

    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.news = state.news.filter((elem: any) => elem._id != action.payload);
      console.log("deleted news", state.news);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (elem: any) => elem._id != action.payload
      );
    });

    builder.addCase(postPet.fulfilled, (state, action) => {
      state.data.push(action.payload);
      console.log("posted data", state.data);
      // console.log("state", state.data);
    });

    builder.addCase(postUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      console.log("posted user", state.users);
    });

    builder.addCase(postNews.fulfilled, (state, action) => {
      state.news.push(action.payload);
      console.log("posted news", state.news);
    });

    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  handleBasket,
  handleAdopt,
  handleDeleteAdopt,
  handleMinus,
  handlePlus,
  handleDelete,
  handleCheckout,
} = petSlice.actions;

export default petSlice.reducer;
