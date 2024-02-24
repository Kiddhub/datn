import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineStock,
} from "react-icons/ai";
import { AiFillPieChart,AiFillStar  } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { FiShoppingBag, FiEdit } from "react-icons/fi";
import { BsKanban } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import { FaBoxOpen,FaShoppingCart  } from "react-icons/fa";
import { CiPercent } from "react-icons/ci";
import { BiSolidCoupon } from "react-icons/bi";
import { IoIosChatboxes } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
export const links = [
  {
    title: "Dashboard",
    links: [
      {
        href: "shop/",
        name: "ecommerce",
        icon: <AiFillPieChart />,
      },
    ],
  },
  {
    title: "Shop",
    links: [
      {
        href: "shop/rating",
        name: "rating",
        icon: <AiFillStar />,
      },
      {
        href: "shop/profile",
        name: "Profile",
        icon: <IoPersonOutline />,
      },
      {
        href: "shop/category",
        name: "Category",
        icon: <BiCategory />,
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        href: "shop/products/list",
        name: "products",
        icon: <FaBoxOpen />,
      },
      {
        href: "shop/products/add",
        name: "Add Product",
        icon: <MdOutlineAddBox />,
      },
    ],
  },
  {
    title: "Orders",
    links: [
      {
        href: "shop/orders",
        name: "Orders",
        icon: <FaShoppingCart />,
      }
      // ,
      // {
      //   href: "ecommerce7",
      //   name: "Cancel Orders",
      //   icon: <BsKanban />,
      // },
      // {
      //   href: "ecommerce8",
      //   name: "Refund Orders",
      //   icon: <FiEdit />,
      // },
    ],
  },
  {
    title: "Marketing",
    links: [
      {
        href: "shop/sale",
        name: "sale",
        icon: <CiPercent />,
      },
      {
        href: "shop/coupon",
        name: "coupon",
        icon: <BiSolidCoupon />,
      },
    ],
  },
  {
    title: "Service",
    links: [
      {
        href: "shop/chat",
        name: "chat",
        icon: <IoIosChatboxes />,
      },
    ],
  },
];

export const orderDb = [
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "cancel",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "2",
    user: "Minh Beo1",
    orderId: "2",
    orderDate: "2023/03/26",
    paymentMehtod: "Banking",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "3",
    user: "Minh Beo",
    orderId: "3",
    orderDate: "2023/03/28",
    paymentMehtod: "COC",
    status: "request",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "request",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "shipping",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "shipped",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "cancel",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "shipped",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "shipped",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "shipping",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "shipping",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },

  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "request",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "request",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "request",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "Banking",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
  {
    id: "1",
    user: "Minh Beo",
    orderId: "1",
    orderDate: "2023/03/25",
    paymentMehtod: "COC",
    status: "refund",
    totalItem: "10",
    totalPrice: "20$",
    shippingAddress: "Ha Nam",
  },
];

export const ratingDb = [
  {
    id: "1",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating:5,
  },
  {
    id: "2",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 2.5,
  },
  {
    id: "3",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 1.5,
  },
  {
    id: "4",
    name: "Man",
    rating: 0.5,
  },
  {
    id: "5",
    name: "Man",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Man",
    rating: 2.5,
  },
  {
    id: "7",
    name: "Man",
    rating: 1.5,
  },
  {
    id: "8",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 4.5,
  },
  {
    id: "9",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 3,
  },
  {
    id: "10",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 2,
  },
  {
    id: "11",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 1,
  },
  {
    id: "12",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 3,
  },
  {
    id: "13",
    name: "Manaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rating: 5,
  },
  {
    id: "14",
    name: "Man",
    rating: 2,
  },
  {
    id: "15",
    name: "Man",
    rating: 1,
  },
];

export const category = [
  { id: "1", name: "Ha", totalItem: "30", status: "Off" },
  { id: "2", name: "Ha", totalItem: "30", status: "On" },
  { id: "3", name: "Ha", totalItem: "30", status: "Off" },
  { id: "4", name: "Ha", totalItem: "30", status: "On" },
];

export const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export const rows = [
  {
    id:"1",
    name: "Frozen yoghurt",
    type: "20x30",
    imageUrl:"https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lonlnr9v8v9sc6",
    quantity: 1,
    price: 200000
  },
  {
    id:"2",
    name: "Frozen yoghurt",
    type: "20x30",
    imageUrl:"https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lonlnr9v8v9sc6",
    quantity: 1,
    price: 200000
  },

  {
    id:"3",
    name: "Frozen yoghurt",
    type: "20x30",
    imageUrl:"https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lonlnr9v8v9sc6",
    quantity: 1,
    price: 200000
  },
];
export const adminLinks = [
  {
    title: "Dashboard",
    links: [
      {
        href: "admin/",
        name: "ecommerce",
        icon: <AiFillPieChart />,
      },
    ],
  },
  {
    title: "Shop",
    links: [
      {
        href: "admin/shops",
        name: "shop",
        icon: <CiShop />,
      }
    ],
  },
  {
    title: "Products",
    links: [
      {
        href: "admin/products",
        name: "products",
        icon: <FaBoxOpen />,
      },
      {
        href: "admin/category",
        name: "category",
        icon: <BiCategory />,
      },
    ],
  },
  {
    title: "Orders",
    links: [
      {
        href: "admin/orders",
        name: "Orders",
        icon: <FaShoppingCart />,
      }
    ],
  },
  {
    title: "Marketing",
    links: [
      {
        href: "admin/sale",
        name: "Sale",
        icon: <CiPercent />,
      },
      {
        href: "admin/coupon",
        name: "Coupon",
        icon: <BiSolidCoupon />,
      },
      {
        href: "admin/couponShop",
        name: "Coupon Shop",
        icon: <BiSolidCoupon />,
      },
    ],
  },
  {
    title: "Service",
    links: [
      {
        href: "admin/chat",
        name: "Chat",
        icon: <IoIosChatboxes />,
      },
      {
        href: "admin/report",
        name: "Report",
        icon: <MdOutlineReport />,
      },
    ],
  },
  
];
export const shop_db =[
  {
    id:"1",
    name:"shop A",
    slogan:"Slogan 1",
    shop_status:"ONLINE"
  },
  {
    id:"2",
    name:"shop A",
    slogan:"Slogan 1",
    shop_status:"ONLINE"
  },
  {
    id:"3",
    name:"shop A",
    slogan:"Slogan 1",
    shop_status:"ONLINE"
  },
  {
    id:"4",
    name:"shop A",
    slogan:"Slogan 1",
    shop_status:"ONLINE"
  }
]

export const coupon_db =[
  {
    id:1,
    code:"ABCDEF",
    coupon_type:"product",
    description:"Giam gia 20% cho don 50k",
    discounted_type:"percent",
    min_price:"50000",
    number:20,
    quantity:10,
    status:"HIDE",  
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40"
  },
  {
    id:2,
    code:"ABCDEF",
    coupon_type:"shipping",
    description:"Mien phi van chuyen",
    discounted_type:"percent",
    min_price:0,
    number:100,
    quantity:10,
    status:"AVAIABLE",  
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40"
  },
  {
    id:3,
    code:"ABCDEF",
    coupon_type:"product",
    description:"Giam gia 20% cho don 50k",
    discounted_type:"percent",
    min_price:"50000",
    number:20,
    quantity:10,
    status:"AVAIABLE",  
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40"
  }
]
export const fake_sale = [
  {
    id:1,
    description: "Sale 12/12",
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40",
    discounted_type:"money",
    discounted_number:100000,
    status:"AVAIABLE"
  },
  {
    id:2,
    description: "Sale 12/12",
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40",
    discounted_type:"percent",
    discounted_number:20,
    status:"HIDE"
  },
  {
    id:3,
    description: "Sale 12/12",
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40",
    discounted_type:"money",
    discounted_number:100000,
    status:"AVAIABLE"
  },
  {
    id:4,
    description: "Sale 12/12",
    time_start:"2023-12-25 15:50:40",
    time_end:"2023-12-25 15:50:40",
    discounted_type:"money",
    discounted_number:100000,
    status:"AVAIABLE"
  },
]