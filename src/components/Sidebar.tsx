import { FaHouse } from "react-icons/fa6";
import { FaSquareCheck } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <aside className="bg-accent flex flex-col">
      <div className="m-6 flex flex-col items-start gap-4">
        <Link
          to="/"
          className="hover:text-whiteDefault flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xl transition-all duration-300 ease-in-out hover:shadow-[inset_150px_0_0_0_#00ADB5]"
        >
          <FaHouse />
          Home
        </Link>
        <Link
          to="/completed"
          className="hover:text-whiteDefault flex cursor-pointer items-center gap-2 rounded-lg p-2 text-lg transition-all duration-300 ease-in-out hover:shadow-[inset_300px_0_0_0_#00ADB5]"
        >
          <FaSquareCheck />
          Completed Tasks
        </Link>
        <Link
          to="active"
          className="hover:text-whiteDefault flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xl transition-all duration-300 ease-in-out hover:shadow-[inset_300px_0_0_0_#00ADB5]"
        >
          <FaClock />
          Active Tasks
        </Link>
      </div>
    </aside>
  );
}
