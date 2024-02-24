import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
const defaultValues = {
  price: "",
  discountedPrice: "",
};

const Pricing = () => {
  const { control, formState } = useForm({
    defaultValues,
  });
  const { errors } = formState;
  return (
    <div className="flex flex-col px-10 h-full">
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "50%" }}
            error={!!errors.price}
            required
            helperText={errors?.price?.message}
            label="Price"
            autoFocus
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="discountedPrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "50%" }}
            error={!!errors.discountedPrice}
            required
            helperText={errors?.discountedPrice?.message}
            label="Sale Price"
            autoFocus
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
};

export default Pricing;
