import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Button from "@mui/material/Button";
const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Vui lòng nhập một số.") // Thông báo lỗi kiểu dữ liệu
    .required("Vui lòng không để trống trường này."), // Thông báo lỗi bắt buộc
});

const defaultValues = {
  size: { name: "", quantity: 0 },
};
const QuantityTab = () => {
  const [sizes, setSizes] = useState([defaultValues.size]);
  const { control } = useForm({
    defaultValues: {
      sizes: [defaultValues],
    },
    resolver: yupResolver(schema),
  });
  const addSizeField = () => {
    const newSizes = [...sizes, defaultValues.size];
    setSizes(newSizes);
  };
  return (
    <div className="px-10">
      {sizes.map((size, index) => (
        <div className="flex space-x-10 h-full" key={index}>
          <Controller
            name={`sizes[${index}].name`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{
                  marginTop: "0.8rem",
                  marginBottom: "1.6rem",
                  width: "20%",
                }}
                required
                label="Name"
                id={`name-${index}`}
                autoFocus
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Controller
            name={`sizes[${index}].quantity`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{
                  marginTop: "0.8rem",
                  marginBottom: "1.6rem",
                  width: "20%",
                }}
                required
                label="Quantity"
                id={`quantity-${index}`}
                type="number"
                autoFocus
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
      ))}
      <Button
        onClick={addSizeField}
        variant="contained"
        sx={{
          width: "200px",
          marginBottom: "1rem",
          backgroundColor: "#427D9D",
          height: "auto",
        }}
      >
        Add Size
      </Button>
    </div>
  );
};

export default QuantityTab;
