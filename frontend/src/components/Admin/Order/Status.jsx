/* eslint-disable react/prop-types */
import clsx from "clsx";
import _ from "lodash";

export const status = [
  {
    id: 1,
    name: "AVAILABLE",
    color: "bg-[#64a338] text-[#FFF1B6]",
  },
  {
    id: 2,
    name: "REQUEST",
    color: "bg-[#3865a3] text-[#FFF1B6]",
  },
  {
    id: 3,
    name: "SOLD",
    color: "bg-[#ffcc00] text-[#000000]",
  },
  {
    id: 4,
    name: "HIDE",
    color: "bg-[#FF9800] text-[#000000]",
  },
  {
    id: 4,
    name: "CANCEL",
    color: "bg-[#e03b24] text-[#000000]",
  },
  {
    id: 5,
    name: "DELIVERY",
    color: "bg-[#87a2c7] text-[#000000]",
  },
  {
    id: 6,
    name: "SHIPPED",
    color: "bg-[#87a2c7] text-[#000000]",
  },
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
