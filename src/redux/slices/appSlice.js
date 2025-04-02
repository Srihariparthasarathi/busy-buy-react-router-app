import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserDB from "../../model/usersDB.model";

const userDB = new UserDB();

const INITIAL_STATE = {
    isLogin: false,
    userId: null,
    error: null
};

export const signUpUserAsync = createAsyncThunk(
    "app/signUp",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await userDB.addUser(username, email, password);
            if (!response.documentId) {
                return thunkAPI.rejectWithValue("User registration failed");
            }
            return { documentId: response.documentId };
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong");
        }
    }
);

export const signInUserAsync = createAsyncThunk(
    "app/signIn",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await userDB.checkUser(email, password);
            if (!response.isUser) {
                return thunkAPI.rejectWithValue("Invalid email or password");
            }
            return { documentId: response.documentId };
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong");
        }
    }
);

const appSlice = createSlice({
    name: "app",
    initialState: INITIAL_STATE,
    reducers: {
        signOutUser: (state) => {
            state.isLogin = false;
            state.userId = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUserAsync.pending, (state) => {
                state.error = null; 
            })
            .addCase(signUpUserAsync.rejected, (state, action) => {
                state.error = action.payload || "Sign-up failed";
            })
            .addCase(signUpUserAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                state.userId = action.payload.documentId;
            })
            .addCase(signInUserAsync.pending, (state) => {
                state.error = null; 
            })
            .addCase(signInUserAsync.rejected, (state, action) => {
                state.error = action.payload || "Sign-in failed";
            })
            .addCase(signInUserAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                state.userId = action.payload.documentId;
            });
    }
});

export default appSlice.reducer;
export const { signOutUser, setError, clearError } = appSlice.actions;
export const appSelector = (state) => state.app;
