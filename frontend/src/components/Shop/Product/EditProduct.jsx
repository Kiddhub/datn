import { Link, useLocation } from "react-router-dom";
import { Alert, Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { putFetch } from "../../../network";
import { Token } from "@mui/icons-material";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import useRequireAuth from "../AuthShop/RequireAuth";
import ProductReport from "./ProductReport";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Vui lòng nhập một số.")
    .required("Vui lòng không để trống trường này."),
});

const EditProduct = () => {
  const location = useLocation();
  const productData = location.state?.data;
  const token = useRequireAuth();
  const [userData, setUserData] = useState(productData);
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(productData?.imageUrl || "https://placehold.it/300");

  const { handleSubmit, register, setValue, getValues, formState } = useForm({
    defaultValues: {
      name: productData?.name || "",
      description: productData?.description || "",
      imageUrl: productData?.imageUrl || "",
      sizes: productData?.sizes || [],
      tags: productData?.tags || [],
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/shop/products/list");
  };

  const addSizeField = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      sizes: [...prevUserData.sizes, { name: "", quantity: 0, price: "" }],
    }));
  };

  const addTagField = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      tags: [...prevUserData.tags, { name: "" }],
    }));
  };

  const updateUserData = (update) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...update,
    }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const submitForm = {
      name: userData.name,
      imageUrl: userData.imageUrl,
      description: userData.description,
      sizes: userData.sizes,
      tags: userData.tags,
    }

    console.log(">>>check userData", submitForm);
    try {
      const res = await putFetch(`/shop/product/update/${productData.id}`, submitForm, token)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Cập nhật thành công")
      navigate('/shop/products/list')
    } catch (err) {
      console.error(err)
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Cập nhật thất bại")
    }
  };

  // Update userData and selectedImage when there's a change in location.state
  useEffect(() => {
    setUserData(productData);
    console.log(">>>", userData)
    setSelectedImage(productData?.imageUrl || "https://placehold.it/300");
  }, [productData]);
  const handleDelete = async () => {
    const form = {
      productId: userData.id,
      status: "DELETED"
    }
    try {
      const res = await putFetch(`/shop/product/${userData.id}`, form, token)
      console.log(">>>< res", res)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Xoá thành công")
    } catch (err) {
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Xoá thất bại")
    }
  }
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
              <img
                className="sm:w-48 rounded-4 h-auto block align-middle"
                src={userData.imageUrl}
                alt="image"
              />
              <div className="w-full ml-10">
                <Typography sx={{ fontSize: "1.8rem", fontWeight: "600" }}>
                  {userData.name}
                </Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                  Product Details
                </Typography>
              </div>
            </div>
          )}
          <div className="flex">
            {userData?.status !== "DELETED" ? (
              <Button
                sx={{
                  bgcolor: "#B15EFF",
                  color: "#FFFFFF",
                  borderRadius: "1.6rem",
                  width: "6rem",
                  alignItems: "center",
                  ":hover": {
                    bgcolor: "#7743DB",
                  },
                }}
                onClick={() => handleDelete()}
              >
                <DeleteIcon />
                Delete
              </Button>
            ) : (
              <>
              </>
            )

            }
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
              onClick={submitProduct}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col px-10 h-full w-1/2">
          <div className="">
            <TextField
              sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "50%" }}
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label="Name"
              autoFocus
              value={userData ? userData.name : ''}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                updateUserData({ name: e.target.value });
              }}
            />
            <ReactQuill
              className="h-[100px]"
              theme="snow"
              value={userData ? userData.description : ''}
              onChange={(value) => {
                updateUserData({ description: value });
              }}
            />
            {/* Tag input */}
            <div className="mt-32">
              {userData &&
                userData.tags.map((tag, index) => (
                  <TextField
                    key={index}
                    sx={{
                      marginTop: "1rem",
                      width: "50%",
                    }}
                    required
                    label={`Tag ${index + 1}`}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    value={tag.name}
                    onChange={(e) => {
                      updateUserData({
                        tags: userData.tags.map((t, i) =>
                          i === index ? { ...t, name: e.target.value } : t
                        ),
                      });
                    }}
                  />
                ))
              }

              <Button
                onClick={addTagField}
                variant="contained"
                sx={{
                  width: "200px",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  backgroundColor: "#427D9D",
                  height: "auto",
                }}
              >
                Add Tag
              </Button>
            </div>
            {/* Upload size and quanity and price */}
            <div className="">
              {userData &&
                userData.sizes.map((size, index) => (
                  <div className="flex space-x-10 h-full" key={index}>
                    <TextField
                      sx={{
                        marginTop: "0.8rem",
                        width: "30%",
                      }}
                      required
                      label="Name"
                      id={`name-${index}`}
                      autoFocus
                      variant="outlined"
                      fullWidth
                      value={size.name}
                      onChange={(e) => {
                        updateUserData({
                          sizes: userData.sizes.map((s, i) =>
                            i === index ? { ...s, name: e.target.value } : s
                          ),
                        });
                      }}
                    />
                    <TextField
                      sx={{
                        marginTop: "0.8rem",
                        width: "30%",
                      }}
                      required
                      label="Quantity"
                      id={`quantity-${index}`}
                      type="number"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      value={size.quantity}
                      onChange={(e) => {
                        updateUserData({
                          sizes: userData.sizes.map((s, i) =>
                            i === index ? { ...s, quantity: e.target.value } : s
                          ),
                        });
                      }}
                    />
                    <TextField
                      sx={{
                        marginTop: "0.8rem",
                        marginBottom: "1.6rem",
                        width: "30%",
                      }}
                      required
                      label="Price"
                      id={`price-${index}`}
                      autoFocus
                      variant="outlined"
                      fullWidth
                      value={size.price}
                      onChange={(e) => {
                        updateUserData({
                          sizes: userData.sizes.map((s, i) =>
                            i === index ? { ...s, price: e.target.value } : s
                          ),
                        });
                      }}
                    />
                  </div>
                ))
              }

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
            {/* Upload Image */}
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-50">
                {/* Your input fields go here */}
                <TextField
                  sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "100%" }}
                  id="imageUrl"
                  label="Image URL"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={userData?.imageUrl || ''}
                  onChange={(e) => {
                    updateUserData({ imageUrl: e.target.value });
                    setSelectedImage(e.target.value);
                  }}
                />
              </div>
              {selectedImage && (
                <div className="flex w-50 justify-center items-center ml-10">
                  <img
                    className="sm:w-[10rem] rounded-4 h-auto"
                    src={selectedImage}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%]">
        <ProductReport productId={userData.id} />
      </div>
      </div>

      

      <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
        {
          showAlert && (
            <Alert
              severity={alertSeverity}
              onClose={() => {
                setShowAlert(false),
                  setAlertSeverity(""),
                  setAlertMessage("")
              }}
              sx={{
                marginBottom: "1rem",
                position: 'absolute',
                top: "5rem",
                right: 0,
              }}
              open={showAlert}
            >
              {alertMessage}
            </Alert>
          )
        }
      </Box>
    </div>
  );
};

export default EditProduct;
