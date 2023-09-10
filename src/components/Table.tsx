import { Link } from "react-router-dom";
import { Employee } from "../features/employee/employeeSlice";
import { Sort } from "./EmployeeList";
import SortButton from "./SortButton";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useAppSelector } from "../app/hooks";

type TableProps = {
  sort: Sort;
  filteredEmployees: Employee[];
  handleSort: (key: string) => void;
  handleDelete: (id: string) => void;
};

const Table = ({
  sort,
  filteredEmployees,
  handleSort,
  handleDelete,
}: TableProps) => {
  const employees = useAppSelector((state) => state.employees);

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-black">
          {Object.keys(employees[0]).map((key, i) =>
            key !== "id" ? (
              <th key={i} className="p-4">
                <SortButton name={key} sort={sort} handleSort={handleSort} />
              </th>
            ) : null
          )}
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.map((employee, i) => {
          return (
            <tr key={i}>
              <td className="p-4 border-b border-gray-200">{employee.name}</td>
              <td className="p-4 border-b border-gray-200">{employee.age}</td>
              <td className="p-4 border-b border-gray-200">
                {employee.gender}
              </td>
              <td className="p-4 border-b border-gray-200">
                {employee.weight}
              </td>
              <td className="p-4 border-b border-gray-200">
                {employee.height}
              </td>
              <td className="p-4 border-b border-gray-200">{employee.bmi}</td>
              <td className="p-4 border-b border-gray-200">
                <div className="flex justify-end gap-3">
                  <Link to={`/edit-employee/${employee.id}`}>
                    <button className="bg-[#66bb6a] w-10 h-10 flex justify-center items-center rounded-full drop-shadow-md hover:opacity-70 transition">
                      <MdModeEditOutline size="24" color="white" />
                    </button>
                  </Link>
                  <button
                    className="bg-[#9e9e9e] w-10 h-10 flex justify-center items-center rounded-full drop-shadow-md hover:opacity-70 transition"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <AiFillDelete size="20" color="white" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
