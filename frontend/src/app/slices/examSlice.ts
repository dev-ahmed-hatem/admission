import { createSlice } from "@reduxjs/toolkit";

interface ExamState {
  national_id: string | null;
  name: string | null;
}

const initialState: ExamState = {
  national_id: null,
  name: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExam(state, action) {
      const { name, national_id } = action.payload;
      (state.name = name), (state.national_id = national_id);
    },
    clearExam(state, action) {
      state.name = null;
      state.national_id = null;
    },
  },
});

export const { setExam, clearExam } = examSlice.actions;
export default examSlice.reducer;
