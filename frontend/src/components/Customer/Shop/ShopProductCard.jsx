import React from 'react'
import { useNavigate } from 'react-router-dom';

const ShopProductCard = ({ products, currentPage, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    const navigate = useNavigate();

    return (
        <div className='flex flex-row flex-wrap gap-2'>
            {currentProducts.map((product, index) => (
                <div key={index} className='w-[14rem] m-4 transition-all cursor-pointer hover:scale-105 hover:shadow-md flex-col pb-8' onClick={(e) => {
                    navigate(`/products/${product.id}`);
                }}>
                    <div className="h-[10rem] overflow-hidden">
                        <img className="h-full w-full object-cover" src={product.imageUrl} alt="" />
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
                                        <div className="text-[0.8rem] text-[#0766AD] line-through">{product.sizes[0].price.toLocaleString()}</div>
                                        <div className="text-[1rem] text-[#0766AD]">1000 đ</div>
                                    </div>
                                )
                            ) : (
                                <div className="text-[1rem] text-[#0766AD]">Price not available</div>
                            )}

                            <div className="">Ha Noi</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShopProductCard;