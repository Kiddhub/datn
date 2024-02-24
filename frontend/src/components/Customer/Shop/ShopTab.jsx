import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Tab, Tabs, Typography } from '@mui/material';


const ShopTab = ({ name, image, slogan, category }) => {
  const buttonItem = [
    {
      id: 0,
      name: "HOME",
    },
    {
      id: 1,
      name: "PRODUCT",
    },
    {
      id: 3,
      name: "DEAL",
    }
  ];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const handleCategoryClick = (categoryId, index) => {
    console.log(`Category with categoryId ${categoryId} clicked`);
    setSelectedCategoryIndex(index);
    // Additional logic for category click if needed
  };

  return (
    <Box
      sx={{
        height: "100px",
        border: "solid 1px",
        display: "flex",
        backgroundImage: `url('https://lzd-img-global.slatic.net/live/id/ot/3b474053e7cf0e5c5297282fc39f03f1.jpg_2200x2200q80.jpg_.webp')`,
        backgroundSize: 'cover',
      }}
    >
      <Box sx={{ width: "30%", display: "flex", gap: 3, alignItems: "center" }}>
        <Avatar
          src={image}
          sx={{ width: "75px", marginLeft: "1rem", height: "75px" }}
        />
        <Box>
          <Typography variant="h5" sx={{ color: "#FFFFEC" }}>
            {name}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button sx={{ background: "#F8FAE5", marginTop: "0.5rem" }}>
              Follow ✔
            </Button>
            <Button sx={{ background: "#F8FAE5", marginTop: "0.5rem" }}>
              Chat now 💬
            </Button>
          </Box>

        </Box>
      </Box>
      <Box sx={{ width: "80%", display: "flex", gap: 3, alignItems: "center" }}>
        <Tabs value={selectedCategoryIndex} sx={{ borderRadius: "0.4rem" }}>
          {/* Categories Tabs */}
          {buttonItem?.map((categoryItem, index) => (
            <Tab
              key={categoryItem.id}
              label={categoryItem.name}
              onClick={() => handleCategoryClick(categoryItem.id, index)}
              sx={{
                background:
                  selectedCategoryIndex === index
                    ? '#93BFCF'
                    : '#F5F7F8',
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ShopTab;
