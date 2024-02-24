import { Link, useLocation } from "react-router-dom";
import { Autocomplete, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Global/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, MenuItem } from "@mui/material";
import * as yup from "yup";
import { imageDb } from "../../../FirebaseImage/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getFetch, postFetch } from "../../../network";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Vui lòng nhập một số.")
    .required("Vui lòng không để trống trường này."),
});

const defaultValues = {
  name: "",
  description: "",
  tags: [{ name: "" }],
  imageUrl: "",
  sizes: [
    {
      name: "",
      quantity: 0,
      price: "",
    },
  ],
  topLevelCategory: "",
  secondLevelCategory: "",
  thirdLevelCategory: "",
};

const AddProduct = () => {
  const token = useSelector((state) => state.token.value);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState("https://placehold.it/300");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const [categories, setCategories] = useState([]);
  const loadCategory = async () => {
    getFetch(`/admin/category/`)
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadCategory();
  }, [token]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSecondLevel, setSelectedSecondLevel] = useState("");
  const [selectedThirdLevel, setSelectedThirdLevel] = useState("");

  const topLevelCategories = categories.filter((category) => category.level === 0);
  const subCategories = categories.filter((category) => category.level === 1);
  const subSubCategories = categories.filter((category) => category.level === 2);

  const { control, formState, setValue, getValues } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [sizess, setSizess] = useState([defaultValues.sizes]);

  const addSizeField = () => {
    setSizess([...sizess, { name: "", quantity: 0, price: "", discountedPrice: "" }]);
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
        setValue("imageUrl", url);
        setSelectedImage(url);
        setIsUploading(false);
      });
    });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const allFormValues = getValues();
    setFormData(allFormValues);
    console.log("All Form Values:", allFormValues);
    try {
      const res = await postFetch('shop/product/create', allFormValues, token);
      console.log(">>> res", res);
      navigate('/shop/products/list', {
        state: {
          showAlert: true,
          alertSeverity: "success",
          alertMessage: "Thêm sản phẩm thành công",
        },
      });
    } catch (err) {
      console.error(err);
      navigate('/shop/products/list', {
        state: {
          showAlert: true,
          alertSeverity: "error",
          alertMessage: "Thêm sản phẩm thất bại",
        },
      });
    }
  };

  const { errors } = formState;

  const [tagValues, setTagValues] = useState(defaultValues.tags);

  const handleAddTag = () => {
    setTagValues([...tagValues, { name: "" }]);
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...tagValues];
    updatedTags[index] = { name: value };
    setTagValues(updatedTags);
    setValue("tags", updatedTags);
  };

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
      </div>
      <Header title="Add Product" category="Product" />
      <Button
        sx={{
          bgcolor: "#B15EFF",
          color: "#FFFFFF",
          borderRadius: "1.6rem",
          width: "2rem",
          alignItems: "center",
          marginBottom: "1rem",
          ":hover": {
            bgcolor: "#7743DB",
          },
        }}
        onClick={submitProduct}
      >
        Save
      </Button>
      <div className="flex flex-col px-10 h-full">
        <TextField
          sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "50%" }}
          error={!!errors.name}
          required
          helperText={errors?.name?.message}
          label="Name"
          autoFocus
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setValue("name", e.target.value);
          }}
        />

        <ReactQuill
          className="w-1/2 h-[100px]"
          theme="snow"
          value={getValues("description")}
          onChange={(value) => setValue("description", value)}
        />

        <Box
          component="form"
          sx={{
            marginTop: "3rem",
            '& .MuiTextField-root': { width: '20%' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-select-category"
              select
              label="Select Category"
              value={selectedCategory}
              onChange={(e) => {
                setValue("topLevelCategory", e.target.value);
                setSelectedCategory(e.target.value);
              }}
              variant="standard"
            >
              {topLevelCategories.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            {selectedCategory && (
              <TextField
                id="standard-select-subcategory"
                select
                label="Select Subcategory"
                value={selectedSecondLevel}
                onChange={(event) => {
                  setSelectedSecondLevel(event.target.value);
                  setValue("secondLevelCategory", event.target.value);
                }}
                variant="standard"
              >
                {subCategories
                  .filter((subCategory) => subCategory.parentCategory?.name === selectedCategory)
                  .map((subOption) => (
                    <MenuItem key={subOption.id} value={subOption.name}>
                      {subOption.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}

            {selectedSecondLevel && (
              <TextField
                id="standard-select-subsubcategory"
                select
                label="Select Subcategory"
                value={selectedThirdLevel}
                onChange={(event) => {
                  setSelectedThirdLevel(event.target.value);
                  setValue("thirdLevelCategory", event.target.value);
                }}
                variant="standard"
              >
                {subSubCategories
                  .filter((subSubCategory) => subSubCategory.parentCategory?.name === selectedSecondLevel)
                  .map((subSubOption) => (
                    <MenuItem key={subSubOption.id} value={subSubOption.name}>
                      {subSubOption.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          </div>
        </Box>

        <div className="flex space-x-10 h-full">
          {tagValues.map((tag, index) => (
            <TextField
              key={index}
              sx={{
                marginTop: "0.8rem",
                marginBottom: "1.6rem",
                width: "20%",
              }}
              required
              label={`Tag ${index + 1}`}
              autoFocus
              variant="outlined"
              fullWidth
              value={tag.name}
              onChange={(e) => handleTagChange(index, e.target.value)}
            />
          ))}
        </div>
        <Button
          onClick={handleAddTag}
          variant="contained"
          sx={{
            width: "200px",
            marginBottom: "1rem",
            backgroundColor: "#427D9D",
            height: "auto",
          }}
        >
          Add Tag
        </Button>

        <div>
          {sizess.map((size, index) => (
            <div className="flex space-x-10 h-full" key={index}>
              <TextField
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
                onChange={(e) => {
                  setValue(`sizes[${index}].name`, e.target.value);
                }}
              />
              <TextField
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
                onChange={(e) => {
                  setValue(`sizes[${index}].quantity`, e.target.value);
                }}
              />
              <TextField
                sx={{
                  marginTop: "0.8rem",
                  marginBottom: "1.6rem",
                  width: "20%",
                }}
                required
                label="Price"
                id={`price-${index}`}
                autoFocus
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setValue(`sizes[${index}].price`, e.target.value);
                }}
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

        <div className="flex flex-row px-10 w-full">
          <div className="flex flex-col w-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "100%" }}
            />
          </div>
          {selectedImage && (
            <div className="flex w-50 justify-center items-center">
              <Box
                sx={{
                  width: "80%",
                }}
              >
                <img
                  className="sm:w-[10rem] rounded-4 h-auto"
                  src={selectedImage}
                  alt=""
                />
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
