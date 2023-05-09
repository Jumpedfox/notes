import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./types";

const initialState: IState = {
  notes: [],
};

const interfaceSlice = createSlice({
  name: "interfaceSlice",
  initialState,
  reducers: {
    addAllNotesRedux: (state, action) => {
      state.notes = action.payload;
    },
    addNoteRedux: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    editNoteRedux: (state, action) => {
      state.notes = state.notes.map(note => note.index === action.payload.index ? action.payload : note);
    },
    removeNoteRedux: (state, action) => {
      state.notes = state.notes.filter(note => note.index !== action.payload);
    }
  },
  extraReducers: {},
});

export const { addAllNotesRedux, addNoteRedux, editNoteRedux, removeNoteRedux } = interfaceSlice.actions;

export default interfaceSlice.reducer;