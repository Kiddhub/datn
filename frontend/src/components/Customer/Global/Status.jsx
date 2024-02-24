/* eslint-disable react/prop-types */
import clsx from "clsx";
import _ from "lodash";

export const status = [
  {
    id: 1,
    name: "REQUEST",
    color: "bg-[#3865a3] text-[#FFF1B6]",
  },
  {
    id: 2,
    name: "DELIVERY",
    color: "bg-[#ffcc00] text-[#000000]",
  },
  {
    id: 3,
    name: "SHIPPED",
    color: "bg-[#FF9800] text-[#000000]",
  },
  {
    id: 4,
    name: "CANCEL",
    color: "bg-[#E91E63] text-[#FFFBF5]",
  }
];

function Status(props) {
  return (
    <div
      className={clsx(
        "inline text-10 font-bold py-4 px-12 rounded-full truncate",
        // eslint-disable-next-line react/prop-types
        _.find(status, { name: props.name }).color
      )}
    >
      {props.name}
    </div>
  );
}
export default Status;
