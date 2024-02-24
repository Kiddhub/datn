import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getFetchWithParams } from "../../../network";
import { useSelector } from "react-redux";

const SearchProducts = ({ onSearch }) => {
  const token = useSelector((state) => state.token.value);
  const [name, setProductName] = useState("");
  const [status, setStatus] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleReset = () => {
    setProductName("");
    setStatus(null);
  };

  const handleSearch = () => {
    const filteredProduct = {};

    if (name.length !== 0) {
      filteredProduct.name = name;
    }

    if (status.length !== 0) {
      filteredProduct.status = status;
    }

    console.log(">>> filter", filteredProduct);
    searchProducts(filteredProduct);
  };

  const searchProducts = async (filterProduct) => {
    try {
      const res = await getFetchWithParams('/shop/product/filter', filterProduct, token);
      console.log(">>> check res", res);
      onSearch(res)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (name !== null || status !== null) {
      searchProducts();
    }
  }, [name, status]);
  return (
    <div className="flex-col items-center">
      <form className="grid grid-cols-2 gap-4 mx-10 my-10">
        <div className="flex items-center my-10">
          <label htmlFor="productName" className="mr-10">
            Tên sản phẩm
          </label>
          <TextField
            className="w-[400px]"
            id="productName"
            name="productName"
            type="text"
            value={name}
            onChange={handleProductNameChange}
            inputProps={{
              minLength: 2,
              placeholder: "Hãy nhập ít nhất 2 ký tự đầu tiên của từ",
            }}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="category" className="mr-20 my-10">
            Trạng thái
          </label>
          <Select
            value={status}
            id="status"
            name="status"
            className="w-[400px]"
            onChange={handleStatusChange}
          >
            <MenuItem key="1" value="AVAIABLE">Avaiable</MenuItem>
            <MenuItem key="2" value="REQUEST">Request</MenuItem>
            <MenuItem key="3" value="SOLD">Sold</MenuItem>
            <MenuItem key="4" value="HIDE">Hide</MenuItem>
            <MenuItem key="5" value="DELETED">Deleted</MenuItem>
          </Select>
        </div>
      </form>

      <div className="flex gap-10 mx-10">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ width: "100px", marginBottom: "1rem" }}
        >
          Tìm kiếm
        </Button>
        <Button
          type="submit"
          sx={{
            backgroundColor: "white",
            color: "black",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
            },
            width: "100px",
            marginBottom: "1rem",
          }}
          onClick={handleReset}
        >
          Nhập lại
        </Button>
      </div>
    </div>
  );
};

export default SearchProducts;
