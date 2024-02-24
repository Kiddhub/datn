import { Paper, Typography, TextField, Button, LinearProgress, Alert } from "@mui/material";
import Header from "../Global/Header";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { imageDb } from "../../../FirebaseImage/Config";
import { putFetch } from "../../../network";
import { useSelector } from "react-redux";

const Profile = ({ shop }) => {
  const token = useSelector((state) => state.token.value)
  const [isUploading, setIsUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    name: shop.name || "",
    address: shop.address || "",
    imageUrl: shop.imageUrl || "",
  });

  const { control, formState } = useForm({
    mode: "onChange",
    defaultValues: formData,
  });

  const { isValid, dirtyFields } = formState;

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      uploadImage(selectedImage);
    }
  };

  const uploadImage = (image) => {
    setIsUploading(true);
    const imgRef = ref(imageDb, `files/${v4()}`);
    uploadBytes(imgRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: url,
        }));
        setIsUploading(false);
      });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const shopData = {
      name: data.get("name"),
      address: data.get("address"),
      imageUrl: formData.imageUrl, // Giữ nguyên ảnh đã được tải lên trước đó
    };
    console.log(shopData);
    try {
      const res = putFetch(`/shop/update/${shop.id}`, shopData, token)
      console.log(">>>res", res)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Cập nhật thành công")
    } catch (err) {
      console.error(err)
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Cập nhật thất bại")
    }
    // Tiếp tục xử lý dữ liệu khi cần thiết
  };

  return (
    <div className="px-10">
      <Header title="Profile" category="Shop" />
      <Paper
        className="overflow-hidden shadow-sm md:w-[40%] rounded mx-auto py-8 px-16"
        sx={{ bgcolor: "#FCF5ED", borderRadius: "15px" }}
      >
        <div className="px-10 py-10">
          <Typography
            className="mt-32 tracking-tight leading-tight"
            sx={{ fontSize: "2rem", fontWeight: "800" }}
          >
            Edit your profile
          </Typography>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit}
          >
            {/* Các trường nhập liệu khác */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ marginBottom: "1.5rem" }}
                  label="Shop Name"
                  autoFocus
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ marginBottom: "1.5rem" }}
                  label="Address"
                  autoFocus
                  type="name"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-upload"
            />
            {isUploading && <LinearProgress />}
            {shop && (
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "30px",
                  marginTop: "2.4rem",
                }}
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Save
              </Button>
            )}
            {!shop && (
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "30px",
                  marginTop: "2.4rem",
                }}
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Create
              </Button>
            )}
            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "30px",
                marginTop: "2.4rem",
              }}
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Cancel
            </Button>
          </form>
        </div>
        {
          showAlert && (
            <Alert
              severity={alertSeverity}
              onClose={() => setShowAlert(false)}
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
      </Paper>
    </div>
  );
};

export default Profile;