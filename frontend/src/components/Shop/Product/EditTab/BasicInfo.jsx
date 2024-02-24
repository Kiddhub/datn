import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryMenu from "../CategoryMenu";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { MenuItem } from "@mui/material";
const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Vui lòng nhập một số.") // Thông báo lỗi kiểu dữ liệu
    .required("Vui lòng không để trống trường này."), // Thông báo lỗi bắt buộc
});

const defaultValues = {
  name: "",
  category: "",
  description: "",
  title: "",
  secondLevelCategory: "",
  thirdLevelCategory: ""
};
const categoriesData = [
  {
    "id": 1,
    "name": "Thời trang nam",
    "description": "Thời trang cho nam",
    "image": "Thời trang cho nam",
    "parentCategory": null,
    "level": 0
  },
  {
    "id": 16,
    "name": "Thời trang nữ",
    "description": "Thời trang cho nữ",
    "image": "Thời trang cho nữ",
    "parentCategory": null,
    "level": 0
  },
  {
    "id": 20,
    "name": "Áo",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 16,
      "name": "Thời trang nữ",
      "description": "Thời trang cho nữ",
      "image": "Thời trang cho nữ",
      "parentCategory": null,
      "level": 0
    },
    "level": 1
  },
  {
    "id": 21,
    "name": "Áo hai dây và ba lỗ",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 20,
      "name": "Áo",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 16,
        "name": "Thời trang nữ",
        "description": "Thời trang cho nữ",
        "image": "Thời trang cho nữ",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 22,
    "name": "Áo ống",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 20,
      "name": "Áo",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 16,
        "name": "Thời trang nữ",
        "description": "Thời trang cho nữ",
        "image": "Thời trang cho nữ",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 23,
    "name": "Áo thun",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 20,
      "name": "Áo",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 16,
        "name": "Thời trang nữ",
        "description": "Thời trang cho nữ",
        "image": "Thời trang cho nữ",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 24,
    "name": "Quần",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 16,
      "name": "Thời trang nữ",
      "description": "Thời trang cho nữ",
      "image": "Thời trang cho nữ",
      "parentCategory": null,
      "level": 0
    },
    "level": 1
  },
  {
    "id": 25,
    "name": "Quần legging",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 24,
      "name": "Quần",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 16,
        "name": "Thời trang nữ",
        "description": "Thời trang cho nữ",
        "image": "Thời trang cho nữ",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 26,
    "name": "Quần dài",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 24,
      "name": "Quần",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 16,
        "name": "Thời trang nữ",
        "description": "Thời trang cho nữ",
        "image": "Thời trang cho nữ",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 27,
    "name": "Khác",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 24,
      "name": "Quần",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 16,
        "name": "Thời trang nữ",
        "description": "Thời trang cho nữ",
        "image": "Thời trang cho nữ",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 28,
    "name": "Váy",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 16,
      "name": "Thời trang nữ",
      "description": "Thời trang cho nữ",
      "image": "Thời trang cho nữ",
      "parentCategory": null,
      "level": 0
    },
    "level": 1
  },
  {
    "id": 29,
    "name": "Quần Jeans",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 16,
      "name": "Thời trang nữ",
      "description": "Thời trang cho nữ",
      "image": "Thời trang cho nữ",
      "parentCategory": null,
      "level": 0
    },
    "level": 1
  },
  {
    "id": 30,
    "name": "Quần Jeans",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 1,
      "name": "Thời trang nam",
      "description": "Thời trang cho nam",
      "image": "Thời trang cho nam",
      "parentCategory": null,
      "level": 0
    },
    "level": 1
  },
  {
    "id": 31,
    "name": "Hoodie và Áo nỉ",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 1,
      "name": "Thời trang nam",
      "description": "Thời trang cho nam",
      "image": "Thời trang cho nam",
      "parentCategory": null,
      "level": 0
    },
    "level": 1
  },
  {
    "id": 32,
    "name": "Áo hoodie",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 31,
      "name": "Hoodie và Áo nỉ",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 1,
        "name": "Thời trang nam",
        "description": "Thời trang cho nam",
        "image": "Thời trang cho nam",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  },
  {
    "id": 33,
    "name": "Áo nỉ",
    "description": null,
    "image": null,
    "parentCategory": {
      "id": 31,
      "name": "Hoodie và Áo nỉ",
      "description": null,
      "image": null,
      "parentCategory": {
        "id": 1,
        "name": "Thời trang nam",
        "description": "Thời trang cho nam",
        "image": "Thời trang cho nam",
        "parentCategory": null,
        "level": 0
      },
      "level": 1
    },
    "level": 2
  }
]
const BasicInfo = ({ onUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSecondLevel, setSelectedSecondLevel] = useState('');
  const [selectedThirdLevel, setSelectedThirdLevel] = useState('');
  const topLevelCategories = categoriesData.filter(category => category.level === 0);
  const subCategories = categoriesData.filter(category => category.level === 1);
  const subSubCategories = categoriesData.filter(category => category.level === 2);
  const { control, formState, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const handleChange = (name, value) => {
    setValue(name, value);
    const formData = { ...defaultValues, [name]: value };
    console.log("Form data:", formData);
    
  };
  const { errors } = formState;
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    defaultValues.category = event.target.value
    setSelectedSecondLevel('');
    setSelectedThirdLevel('');
  };
  return (
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
          defaultValues.name = e.target.value
          console.log(">>>", defaultValues)
          onUpdate(defaultValues);
        }
        }
      />
      <TextField

        sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "50%" }}
        error={!!errors.title}
        required
        helperText={errors?.name?.message}
        label="Title"
        autoFocus
        variant="outlined"
        fullWidth
        onChange={(e) => {
          defaultValues.title = e.target.value
          console.log(">>>", defaultValues)
          onUpdate(defaultValues);
        }
        }
      />
      <TextField
        sx={{ marginTop: "0.8rem", marginBottom: "1.6rem", width: "50%" }}
        id="description"
        label="Description"
        type="text"
        required
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          defaultValues.description = e.target.value
          console.log(">>>", defaultValues)
          onUpdate(defaultValues);
        }
        }
      />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
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
            onChange={handleCategoryChange}
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
                defaultValues.secondLevelCategory = event.target.value
                console.log(">>> default value", defaultValues)
                onUpdate(defaultValues);
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
                defaultValues.thirdLevelCategory = event.target.value
                console.log(">>> default value", defaultValues)
                onUpdate(defaultValues);
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

    </div>

  );
};

export default BasicInfo;
