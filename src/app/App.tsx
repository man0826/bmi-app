import { Route, Routes } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/create-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
      </Routes>
    </div>
  );
}

export default App;
