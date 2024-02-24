import { Paper, Typography, TextField, Button, LinearProgress, Modal, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../../../FirebaseImage/Config"; // Thay đổi đường dẫn đến file cấu hình Firebase của bạn
import { useSelector } from "react-redux";
import SignIn from "../AuthShop/SignIn";
import { postFetch } from "../../../network";

const CreateShop = () => {
  const [open, setOpen] = useState(false)
  const token = useSelector((state) => state.token.value)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    imageUrl: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const { control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
    },
  });

  useEffect(() => {
    if (token === null) {
      navigate('/shop/login')
    }
  }, [token]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const shopData = {
      name: data.get("name"),
      address: data.get("address"),
      imageUrl: formData.imageUrl, // Lấy giá trị imageUrl từ state
    };
    try {
      const res = await postFetch('auth/newShop', shopData, token);
      setOpen(true)
    } catch (err) {
      console.error(err);
    }
  };

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

  const { isValid, dirtyFields } = formState;

  return token ? (
    <>
      <div className="py-[10rem]">
        <Paper
          className="overflow-hidden shadow-sm md:w-[40%] rounded mx-auto py-8 px-16"
          sx={{ bgcolor: "#FCF5ED", borderRadius: "15px" }}
        >
          <div className="px-10 py-10">
            <Typography
              className="mt-32 tracking-tight leading-tight"
              sx={{ fontSize: "2rem", fontWeight: "800" }}
            >
              Create your profile
            </Typography>
            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit}
            >
              {/* Các trường TextField */}
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

              {/* Input cho việc chọn ảnh */}
              <input type="file" onChange={handleImageChange} />

              {/* Hiển thị CircularProgress khi đang upload ảnh */}
              {isUploading && <LinearProgress />}

              {/* Button để submit */}
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "30px",
                  marginTop: "2.4rem",
                }}
                aria-label="Create"
                disabled={_.isEmpty(dirtyFields) || !isValid || isUploading}
                type="submit"
                size="large"
              >
                Create
              </Button>

              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "30px",
                  marginTop: "2.4rem",
                }}
                aria-label="Cancel"
                disabled={isUploading}
                size="large"
              >
                Cancel
              </Button>
            </form>
          </div>
        </Paper>
      </div>
      <Modal
        open={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff', // White background for the modal content
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px', // Set the maximum width as needed
            textAlign: 'center', // Center the text inside the Box
          }}
        >
          <Typography>Tạo thành công</Typography>
          <Button
            onClick={() => navigate('/shop/')}
            style={{
              marginTop:"1rem",
              backgroundColor: '#007bff', // Blue color for the button
              color: '#fff', // White text color
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '0 auto', // Center the button inside the Box
            }}
          >
            Vào trang chủ
          </Button>
        </Box>
      </Modal>
    </>

  ) : (<SignIn />);
};

export default CreateShop;
