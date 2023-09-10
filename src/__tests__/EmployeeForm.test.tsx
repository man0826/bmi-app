import EmployeeForm from "../components/EmployeeForm";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";

afterEach(() => cleanup());

describe("登録ボタンを押した時のテスト", () => {
  let nameInput: HTMLInputElement;
  let ageInput: HTMLInputElement;
  let weightInput: HTMLInputElement;
  let heightInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  const setup = () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeeForm />
        </Provider>
      </BrowserRouter>
    );

    nameInput = screen.getByPlaceholderText("山田 太郎") as HTMLInputElement;
    ageInput = screen.getByPlaceholderText("25") as HTMLInputElement;
    weightInput = screen.getByPlaceholderText("70") as HTMLInputElement;
    heightInput = screen.getByPlaceholderText("180") as HTMLInputElement;
    submitButton = screen.getByRole("button", {
      name: "登録",
    }) as HTMLButtonElement;
  };

  it("未入力の場合、エラーメッセージが表示される", async () => {
    setup();

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(ageInput, { target: { value: "" } });
    fireEvent.change(weightInput, { target: { value: "" } });
    fireEvent.change(heightInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("名前が入力されていません。")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("年齢が入力されていません。")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("体重が入力されていません。")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("身長が入力されていません。")
    ).toBeInTheDocument();
  });
  it("年齢、体重、身長の入力データが数字以外の場合、エラーメッセージが表示される", async () => {
    setup();

    fireEvent.change(ageInput, { target: { value: "二十五" } });
    fireEvent.change(weightInput, { target: { value: "六十" } });
    fireEvent.change(heightInput, { target: { value: "百八十" } });
    fireEvent.click(submitButton);

    expect(await screen.findAllByText("数字を入力してください。")).toHaveLength(
      3
    );
  });
  it("登録成功で入力データがリセットされる", async () => {
    setup();

    fireEvent.change(nameInput, { target: { value: "田中" } });
    fireEvent.change(ageInput, { target: { value: "40" } });
    fireEvent.change(weightInput, { target: { value: "65" } });
    fireEvent.change(heightInput, { target: { value: "178" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toBe("");
    });
    await waitFor(() => {
      expect(ageInput.value).toBe("");
    });
    await waitFor(() => {
      expect(weightInput.value).toBe("");
    });
    await waitFor(() => {
      expect(heightInput.value).toBe("");
    });
  });
});
