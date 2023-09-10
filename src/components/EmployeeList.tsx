import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Employee, deleteEmployee } from "../features/employee/employeeSlice";
import Table from "./Table";

export type Sort = {
  key: string;
  order: number;
};

const EmployeeList = () => {
  const initialSortState = { key: "", order: 1 };
  const employees = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [sort, setSort] = useState<Sort>(initialSortState);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    let _filteredEmployees = [...filteredEmployees];
    const key = sort.key as keyof Employee;

    if (key) {
      _filteredEmployees = _filteredEmployees.sort((a, b) => {
        const aKey = a[key].toLowerCase();
        const bKey = b[key].toLowerCase();

        if (key === "name" || key === "gender") {
          if (aKey > bKey) {
            return 1 * sort.order;
          }
          if (aKey < bKey) {
            return -1 * sort.order;
          }
          return 0;
        } else {
          return (Number(aKey) - Number(bKey)) * sort.order;
        }
      });
    }
    setFilteredEmployees(_filteredEmployees);
  }, [sort]);

  const handleDelete = (id: string) => {
    setSearchText("");
    dispatch(deleteEmployee(id));
  };

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    const searchEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    setFilteredEmployees(searchEmployees);
    setSort(initialSortState);
  };

  const handleSort = (key: string) => {
    if (sort.key === key) {
      setSort({ ...sort, order: -sort.order });
    } else {
      setSort({
        key,
        order: -1,
      });
    }
  };

  return (
    <div className="px-4 py-20">
      <div className="max-w-[1100px] mx-auto">
        <div className="bg-white px-10 py-16 rounded-md drop-shadow-xl">
          <h1 className="text-2xl font-bold mb-6">社員一覧</h1>
          <div className="flex justify-end gap-6 mb-4">
            <input
              type="text"
              className="w-[200px] bg-gray-100 px-3 py-2 placeholder:text-gray-300"
              value={searchText}
              placeholder="名前検索"
              onChange={handleSearch}
            />
            <Link to="/create-employee">
              <button className="bg-blue-500 text-white tracking-wider px-8 py-2 rounded drop-shadow hover:opacity-70 transition">
                新規登録
              </button>
            </Link>
          </div>
          {employees.length ? (
            <Table
              filteredEmployees={filteredEmployees}
              sort={sort}
              handleSort={handleSort}
              handleDelete={handleDelete}
            />
          ) : (
            <p className="text-center py-4">登録はありません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
