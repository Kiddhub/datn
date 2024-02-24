import { Typography } from "@mui/material";
const Products = ({product}) => {
  console.log(">>produt",product)
  return (
    <div className="px-10 w-auto">
      <div className="table-responsive">
        <table className="simple">
          <thead>
            <tr>
              <th>
                <Typography className="font-semibold">ID</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Name</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Image</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Size</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Price</Typography>
              </th>
              <th>
                <Typography className="font-semibold">Quantity</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((row,index) => (
            <tr key={index}>
              <td className="w-64">{++index}</td>
              <td>
                <Typography
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  {row.product?.name}
                </Typography>
              </td>
              <td className="w-80">
                <img className={row.product?.imageUrl} src="" alt="product" />
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{row.size}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{row.price}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{row.quantity}</span>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
