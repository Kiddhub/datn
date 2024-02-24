import { Box } from "@mui/material";

const dbtest = [
  {
    id: "1",
    imageUrl: {
      imageUrl1:
        "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70",
      imageUrl2:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70",
      imageUrl3:
        "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70",
      imageUrl4:
        "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70",
    },
    name: "Majestic Man",
    shortDescription: "Men Printed Pure Cotton Straight Kurta",
    color: "Green",
    discountedPrice: 499,
    price: 1499,
    discountPersent: 66,
    quantity: 100,
    numRating: 3.5,
    topLavelCategory: "Men",
    secondLavelCategory: "Clothing",
    thirdLavelCategory: "mens_kurta",
    longDescription:
      "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style.",
    status: "available",
  },
];
const ImageProduct = () => {
  return (
    <div className="py-10 w-[50%]">
      {dbtest.map((product) => (
        <div key={product.id} className="grid grid-cols-4 w-[50%] h-auto gap-4">
          {Object.values(product.imageUrl).map((image, index) => (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                marginX: "1.6rem",
                width: "6rem",
                marginY: "1rem",
              }}
            >
              <img
                className="sm:w-[10rem] rounded-4 h-auto"
                src={image}
                alt={`Image ${index + 1}`}
              />
            </Box>
          ))}
        </div>
      ))}

      <Box
        sx={{
          cursor: "pointer",
          marginX: "1.6rem",
          width: "6rem",
          marginY: "0.5rem",
        }}
      >
        <img
          className="sm:w-[10rem] rounded-4 h-auto"
          src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70"
          alt=""
        />
      </Box>
    </div>
  );
};

export default ImageProduct;
