import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ products, currentPage, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    const navigate = useNavigate();

    const calculateDiscountedPrice = (price, discountType, discountNumber) => {
        if (discountType === 'PERCENT') {
            return (price * (100 - discountNumber) / 100).toLocaleString();
        } else if (discountType === 'VNĐ') {
            return (price - discountNumber).toLocaleString();
        } else {
            return price.toLocaleString();
        }
    };

    return (
        <div className='flex flex-row flex-wrap gap-2'>
            {currentProducts.map((product, index) => (
                <div key={index} className='w-[14rem] m-4 transition-all relative cursor-pointer hover:scale-105 hover:shadow-md flex-col pb-8' onClick={(e) => {
                    // Kiểm tra nếu sản phẩm có status là "BANNED"
                    if (product.status === "BANNED") {
                        return; // Không cho phép navigate
                    }
                    navigate(`/products/${product.id}`);
                }}>
                    <div className="h-[10rem] overflow-hidden relative">
                        <img className="h-full w-full object-cover" src={product.imageUrl} alt="" />
                        {/* Overlay với hình ảnh X nếu sản phẩm có status là "BANNED" */}
                        {product.status === "BANNED" && (
                            <img src="https://cdn.pixabay.com/photo/2016/10/09/17/28/banned-1726366_1280.jpg"
                                alt="Banned" className="absolute top-0 left-0 h-full w-full object-cover" />
                        )}
                    </div>
                    <div className="bg-blue-100 p-3">
                        <div className="">
                            <p className="text-[1.2rem] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[150px]">
                                {product.name}
                            </p>
                            {product.sizes && product.sizes.length > 0 ? (
                                product.discountType === null ? (
                                    <div className="text-[1rem] text-[#0766AD]">{product.sizes[0].price.toLocaleString()} đ</div>
                                ) : (
                                    <div className='flex items-center gap-3'>
                                        <div className="text-[0.8rem] text-[#0766AD] line-through">{product.sizes[0].price.toLocaleString()} đ</div>
                                        <div className="text-[1rem] text-[#0766AD]">{calculateDiscountedPrice(product.sizes[0].price, product.discountType, product.discountNumber)} đ</div>
                                    </div>
                                )
                            ) : (
                                <div className="text-[1rem] text-[#0766AD]">Price not available</div>
                            )}

                            <div className="">{product.shop.address}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductCard;
