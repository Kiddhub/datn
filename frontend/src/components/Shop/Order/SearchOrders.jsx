import { Button, TextField } from "@mui/material";
import { useState } from "react";

const SearchOrders = () => {
  const [productName, setProductName] = useState("");
  const [user, setUser] = useState("");
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleCreate = () => {};
  const handleReset = () => {
    setProductName("");
    setUser("");
  };
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
            value={productName}
            onChange={handleProductNameChange}
            inputProps={{
              minLength: 2,
              placeholder: "Hãy nhập ít nhất 2 ký tự đầu tiên của từ",
            }}
          />
        </div>
        <div className="flex items-center my-10">
          <label htmlFor="user" className="mr-10">
            Tên khách hàng
          </label>
          <TextField
            className="w-[400px]"
            id="user"
            name="user"
            type="text"
            value={user}
            onChange={handleUserChange}
            inputProps={{
              minLength: 2,
              placeholder: "Hãy nhập ít nhất 2 ký tự đầu tiên của từ",
            }}
          />
        </div>
      </form>
      <div className="flex gap-10 mx-10">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ width: "100px", marginBottom: "1rem" }}
        >
          Tạo
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

export default SearchOrders;
