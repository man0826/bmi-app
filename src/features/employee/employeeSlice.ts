import { createSlice } from "@reduxjs/toolkit";

export type Employee = {
  id: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  bmi: string;
};

const initialState: Employee[] = [];

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    editEmployee: (state, action) => {
      const { id, name, age, gender, weight, height, bmi } = action.payload;
      const findEmployee = state.find((employee) => employee.id === id);
      if (findEmployee) {
        findEmployee.name = name;
        findEmployee.age = age;
        findEmployee.gender = gender;
        findEmployee.weight = weight;
        findEmployee.height = height;
        findEmployee.bmi = bmi;
      }
    },
    deleteEmployee: (state, action) => {
      const findEmployee = state.find(
        (employee) => employee.id === action.payload
      );
      if (findEmployee) {
        state.splice(state.indexOf(findEmployee), 1);
      }
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
