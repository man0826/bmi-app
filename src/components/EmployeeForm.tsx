import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  Employee,
  addEmployee,
  editEmployee,
} from "../features/employee/employeeSlice";
import uuid from "react-uuid";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Modal from "./Modal";
import { RingSpinner } from "react-spinner-overlay";

type Errors = {
  name: string;
  age: string;
  weight: string;
  height: string;
};

const EmployeeForm = () => {
  const initialEmployeeState = {
    id: "",
    name: "",
    age: "",
    gender: "男性",
    weight: "",
    height: "",
    bmi: "",
  };
  const employees = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState<Employee>(initialEmployeeState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bmiResult, setBmiResult] = useState("");
  const [formErrors, setFormErrors] = useState<Errors>({
    name: "",
    age: "",
    weight: "",
    height: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (
      formErrors.name === "" &&
      formErrors.age === "" &&
      formErrors.weight === "" &&
      formErrors.height === "" &&
      isSubmit
    ) {
      setIsLoading(true);
      setTimeout(() => {
        const bmi = calcBmi();
        if (id) {
          dispatch(editEmployee({ ...employee, id, bmi }));
        } else {
          dispatch(addEmployee({ ...employee, id: uuid(), bmi }));
        }
        setEmployee(initialEmployeeState);
        setIsModalOpen(true);
        setIsLoading(false);
      }, 1000);
    }
  }, [formErrors]);

  useEffect(() => {
    if (id) {
      const findEmployee = employees.find((employee) => employee.id === id);
      if (findEmployee) {
        setEmployee(findEmployee);
      }
    }
  }, [id, employees]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormErrors(validate(employee));
    setIsSubmit(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const calcBmi = () => {
    let bmi = "";
    if (employee.weight !== "" && employee.height !== "") {
      bmi = (
        Number(employee.weight) / Math.pow(Number(employee.height) / 100, 2)
      ).toFixed(2);
      setBmiResult(bmi);
    }
    return bmi;
  };

  const validate = (values: Employee): Errors => {
    const errors = { name: "", age: "", weight: "", height: "" };
    if (!values.name) {
      errors.name = "名前が入力されていません。";
    }
    if (!values.age) {
      errors.age = "年齢が入力されていません。";
    } else if (isNaN(Number(values.age))) {
      errors.age = "数字を入力してください。";
    }
    if (!values.weight) {
      errors.weight = "体重が入力されていません。";
    } else if (isNaN(Number(values.weight))) {
      errors.weight = "数字を入力してください。";
    }
    if (!values.height) {
      errors.height = "身長が入力されていません。";
    } else if (isNaN(Number(values.height))) {
      errors.height = "数字を入力してください。";
    }
    return errors;
  };

  return (
    <div className="px-4 py-16">
      <div className="max-w-[700px] mx-auto">
        <div className="bg-white px-12 pt-10 pb-16 rounded-md drop-shadow-xl">
          <Link to="/">
            <button className="flex gap-1.5 text-[16px] text-gray-600 ml-[-10px] mb-10">
              <IoChevronBack size={24} className="mt-[1px]" />
              戻る
            </button>
          </Link>
          <h1 className="text-2xl font-bold mb-10">社員情報入力</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="name"
              label="名前"
              placeholder="山田 太郎"
              value={employee.name}
              onChange={handleChange}
              error={formErrors.name}
            />
            <Input
              type="text"
              id="age"
              label="年齢"
              placeholder="25"
              value={employee.age}
              onChange={handleChange}
              error={formErrors.age}
            />
            <div className="flex gap-7">
              <p className="font-bold">性別</p>
              <Input
                type="radio"
                id="male"
                label="男性"
                name="gender"
                value="男性"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmployee({ ...employee, gender: e.target.value });
                }}
                checked={employee.gender === "男性"}
              />
              <Input
                type="radio"
                id="female"
                label="女性"
                name="gender"
                value="女性"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmployee({ ...employee, gender: e.target.value });
                }}
                checked={employee.gender === "女性"}
              />
            </div>
            <Input
              type="text"
              id="weight"
              label="体重"
              placeholder="70"
              value={employee.weight}
              onChange={handleChange}
              error={formErrors.weight}
            />
            <Input
              type="text"
              id="height"
              label="身長"
              placeholder="180"
              value={employee.height}
              onChange={handleChange}
              error={formErrors.height}
            />
            <div className="flex justify-center mt-10">
              <button
                className="flex justify-center items-center bg-blue-500 tracking-[.3em] text-white rounded p-3 max-w-[300px] w-full h-14 drop-shadow"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RingSpinner loading={isLoading} size={20} color="#fff" />
                ) : id ? (
                  "更新"
                ) : (
                  "登録"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={handleCloseModal}
        bmi={Number(bmiResult)}
      />
    </div>
  );
};

export default EmployeeForm;
