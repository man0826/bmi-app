import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  bmi: number;
};

type Message = {
  title1: string;
  title2: string;
};

const Modal = ({ isModalOpen, closeModal, bmi }: ModalProps) => {
  const [message, setMessage] = useState<Message>({ title1: "", title2: "" });
  useEffect(() => {
    if (bmi < 18.5) {
      setMessage({
        title1: "低体重です",
        title2: "低体重",
      });
    } else if (bmi < 25) {
      setMessage({
        title1: "普通体重です",
        title2: "",
      });
    } else if (bmi < 30) {
      setMessage({
        title1: "肥満です",
        title2: "肥満度1",
      });
    } else if (bmi < 35) {
      setMessage({
        title1: "肥満です",
        title2: "肥満度2",
      });
    } else if (bmi < 40) {
      setMessage({
        title1: "高度肥満です",
        title2: "肥満度3",
      });
    } else {
      setMessage({
        title1: "高度肥満です",
        title2: "肥満度4",
      });
    }
  }, [bmi]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[#0000007c] flex justify-center items-center transition duration-300 ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white w-[500px] rounded-lg relative px-6 py-14">
        <button className="absolute top-4 right-5" onClick={closeModal}>
          <AiOutlineClose size="25" />
        </button>
        <p className="text-lg text-center mb-8">
          あなたのBMIは
          <span className="text-[40px] text-rose-400 font-bold ml-2">
            {bmi}
          </span>
        </p>
        <h2 className="text-[35px] text-gray-600 text-center font-bold mb-12">
          {message.title1}
        </h2>
        {message.title2 && (
          <dl className="flex justify-center text-lg">
            <dt className="mr-8">判定</dt>
            <dd>{message.title2}</dd>
          </dl>
        )}
      </div>
    </div>
  );
};

export default Modal;
