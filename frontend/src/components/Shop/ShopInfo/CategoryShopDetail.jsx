import { Link, useLocation } from "react-router-dom";
import { Alert, Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { putFetch } from "../../../network";
import useRequireAuth from "../AuthShop/RequireAuth";
import CategoryShopProduct from "./CategoryShopProduct";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng không để trống trường này."),
  description: yup.string().required("Vui lòng không để trống trường này."),
});

const CategoryShopDetail = () => {
  const location = useLocation();
  const data = location.state?.data;
  const token = useRequireAuth();
  const [userData, setUserData] = useState(data);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/shop/category");
  };

  const submitProduct = async (formData) => {
    console.log(">>> form Data",formData)
    try{
        const res = await putFetch(`/shop/categoryShop/update/${data.id}`,formData,token)
        console.log(">>>res",res)
        setShowAlert(true)
        setAlertMessage("Cập nhật thành công")
        setAlertSeverity("success")
    }catch(err){
        console.error(err)
        setShowAlert(true)
        setAlertMessage("Cập nhật thất bại")
        setAlertSeverity("error")
    }
  };
  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <div className="px-10 py-10">
      <div className="mb-16">
        <div
          className="flex cursor-pointer rounded-full px-10 py-10 items-center"
          onClick={handleBack}
        >
          <ArrowBackIcon sx={{ width: "14px" }} />
          <Typography
            component={Link}
            sx={{ fontSize: "14px", fontWeight: "400", marginLeft: "0.4rem" }}
          >
            Back
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          {userData && (
            <div className="flex items-center gap-3">
              <div className="w-full ml-10">
                <Typography sx={{ fontSize: "1.8rem", fontWeight: "600" }}>
                  {userData.name}
                </Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                  Category Details
                </Typography>
              </div>
            </div>
          )}
          <div className="flex">
            <Button
              sx={{
                bgcolor: "#B15EFF",
                color: "#FFFFFF",
                borderRadius: "1.6rem",
                width: "2rem",
                marginLeft: "0.5rem",
                alignItems: "center",
                ":hover": {
                  bgcolor: "#7743DB",
                },
              }}
              onClick={handleSubmit(submitProduct)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col px-10 h-full w-1/2">
          <TextField
            sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "100%" }}
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            {...register("name")}
          />
          <TextField
            sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "100%" }}
            error={!!errors.description}
            required
            helperText={errors?.description?.message}
            label="Description"
            autoFocus
            {...register("description")}
          />
        </div>
        <div className="w-[50%]">
          <CategoryShopProduct categoryShopId={userData.id} />
        </div>
      </div>

      <Box sx={{ padding: "2rem", justifyContent: "space-between" }}>
        {showAlert && (
          <Alert
            severity={alertSeverity}
            onClose={() => {
              setShowAlert(false), setAlertSeverity(""), setAlertMessage("");
            }}
            sx={{
              marginBottom: "1rem",
              position: "absolute",
              top: "5rem",
              right: 0,
            }}
            open={showAlert}
          >
            {alertMessage}
          </Alert>
        )}
      </Box>
    </div>
  );
};

export default CategoryShopDetail;
