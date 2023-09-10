import { Sort } from "./EmployeeList";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

type SortButtonProps = {
  name: string;
  sort: Sort;
  handleSort: (key: string) => void;
};

const SortButton = ({ name, sort, handleSort }: SortButtonProps) => {
  const convertJP = (name: string) => {
    switch (name) {
      case "name":
        return "名前";
      case "age":
        return "年齢";
      case "gender":
        return "性別";
      case "weight":
        return "体重";
      case "height":
        return "身長";
      default:
        return "BMI";
    }
  };

  return (
    <button
      className="flex items-center gap-2 tracking-widest"
      onClick={() => handleSort(name)}
    >
      {convertJP(name)}
      {sort.key === name ? (
        sort.order === 1 ? (
          <TiArrowSortedUp size={20} />
        ) : (
          <TiArrowSortedDown size={20} />
        )
      ) : (
        <TiArrowSortedUp size={20} />
      )}
    </button>
  );
};

export default SortButton;
