import React from 'react';
import ReactPaginate from 'react-paginate';

const ShopPagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="flex justify-center list-none p-0"
      activeClassName="bg-blue-500 text-white"
      pageClassName="m-1"
      pageLinkClassName="px-4 py-2 border rounded hover:bg-blue-200"
      breakClassName="m-1"
      previousClassName="m-1"
      nextClassName="m-1"
      previousLinkClassName="px-4 py-2 border rounded hover:bg-blue-200"
      nextLinkClassName="px-4 py-2 border rounded hover:bg-blue-200"
    />
  );
};

export default ShopPagination;