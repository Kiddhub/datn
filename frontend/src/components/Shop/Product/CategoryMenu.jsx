import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { MenuItem, TextField } from '@mui/material';


const CategoryMenu = ({ onCategoryChange }) => {
  

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSecondLevel('');
    setSelectedThirdLevel('');
    onCategoryChange({
      category: event.target.value,
      secondLevel: '',
      thirdLevel: '',
    }); // Reset subcategory and subsubcategory when category changes
  };

  return (
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
              onCategoryChange({
                category: selectedCategory,
                secondLevel: event.target.value,
                thirdLevel: '',
              });
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
              onCategoryChange({
                category: selectedCategory,
                secondLevel: selectedSecondLevel,
                thirdLevel: event.target.value,
              });
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
  );
};

export default CategoryMenu;
