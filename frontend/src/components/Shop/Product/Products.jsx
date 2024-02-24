import { useEffect, useState } from "react";
import Header from "../Global/Header";
import ListProducts from "./ListProducts";

const Products = ({shop}) => {
  return (
    <div className="md:m-20 md:mt-20">
      <Header title="Products" category="Products" />
      <div className="mt-10 bg-[#FFFFFF] rounded-16">
        <ListProducts/>
      </div>
    </div>
  );
};

export default Products;
