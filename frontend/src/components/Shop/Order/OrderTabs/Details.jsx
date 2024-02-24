import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
const Details = ({ order }) => {
  return (
    <div className="px-10 w-auto">
      <div className="pb-48">
        <div className="pb-16 flex items-center gap-2">
          <PersonOutlineOutlinedIcon />
          <Typography className="h2 mx-12 font-medium">Customer</Typography>
        </div>

        <div className="mb-[1.2rem]">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Address</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">City</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <Avatar />
                      <Typography className="mx-8 truncate">
                        {order.firstName} {order.lastName}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">{order.mobile}</Typography>
                  </td>
                  <td>
                    <Typography className="truncate">{order.address}</Typography>
                  </td>
                  <td>
                    <Typography className="truncate">{order.city}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="pb-48">
        <div className="pb-16 flex items-center gap-2">
          <AccessTimeOutlinedIcon />
          <Typography>Status Order</Typography>
        </div>
        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Status</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Updated On</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Typography className="truncate">Created At</Typography>
                </td>
                <td>
                  <Typography className="truncate">{order.createdAt}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography className="truncate">Delivery At</Typography>
                </td>
                <td>
                  <Typography className="truncate">{order.deliveryDate}</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="pb-48">
        <div className="pb-16 flex items-center gap-2">
          <AttachMoneyOutlinedIcon />
          <Typography className="h2 mx-12 font-medium">Payment</Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">
                    Total Price
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Total Discount Price
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Payment Method
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Typography className="truncate">{order.totalPrice} vnđ</Typography>
                </td>
                <td>
                  <Typography className="truncate">{order.discountPrice} vnđ</Typography>
                </td><td>
                  <Typography className="truncate">{order.payment}</Typography>
                </td>    
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
