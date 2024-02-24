/* eslint-disable react/prop-types */
import clsx from "clsx";
import _ from "lodash";

export const status = [
  {
    id: 1,
    name: "AVAILABLE",
    color: "bg-[#4CAF50] text-[#FFF1B6]",
  },
  {
    id: 2,
    name: "REQUEST",
    color: "bg-[#1976D2] text-[#FFF1B6]",
  },
  {
    id: 3,
    name: "SOLD",
    color: "bg-[#FF9800] text-[#000000]",
  },
  {
    id: 4,
    name: "HIDE",
    color: "bg-[#FF9800] text-[#000000]",
  },
  {
    id: 4,
    name: "DELETED",
    color: "bg-[#FF9800] text-[#000000]",
  },
  {
    id: 5,
    name: "BANNED",
    color: "bg-[#FF9800] text-[#000000]",
  },
  {
    id: 6,
    name: "DENY",
    color: "bg-[#F6416C] text-[#000000]",
  },
];

function ProductStatus(props) {
  return (
    <div
      className={clsx(
        "inline text-12 font-bold py-4 px-12 rounded-full truncate",
        // eslint-disable-next-line react/prop-types
        _.find(status, { name: props.name }).color
      )}
    >
      {props.name}
    </div>
  );
}
export default ProductStatus;
