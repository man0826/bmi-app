import reducer, {
  Employee,
  addEmployee,
  deleteEmployee,
  editEmployee,
} from "../features/employee/employeeSlice";

describe("ストアのテスト", () => {
  it("社員の登録", () => {
    const initialState: Employee[] = [];
    const expectedActions = {
      id: "1",
      name: "山田",
      age: "25",
      gender: "男性",
      weight: "70",
      height: "180",
      bmi: "21.6",
    };
    const action = {
      type: addEmployee.type,
      payload: expectedActions,
    };
    const state = reducer(initialState, action);
    expect(state[0]).toEqual(expectedActions);
  });
  it("社員の編集", () => {
    const initialState: Employee[] = [
      {
        id: "1",
        name: "山田",
        age: "25",
        gender: "男性",
        weight: "70",
        height: "180",
        bmi: "21.6",
      },
    ];
    const expectedActions = {
      id: "1",
      name: "田中",
      age: "40",
      gender: "女性",
      weight: "60",
      height: "160",
      bmi: "23.44",
    };
    const action = {
      type: editEmployee.type,
      payload: expectedActions,
    };
    const state = reducer(initialState, action);
    expect(state[0]).toEqual(expectedActions);
  });
  it("社員の削除", () => {
    const initialState: Employee[] = [
      {
        id: "1",
        name: "山田",
        age: "25",
        gender: "男性",
        weight: "70",
        height: "180",
        bmi: "21.6",
      },
    ];
    const action = {
      type: deleteEmployee.type,
      payload: "1",
    };
    const state = reducer(initialState, action);
    expect(state).toEqual([]);
  });
});
