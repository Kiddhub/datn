package com.project.service.impl;

import com.project.dto.request.AddProductToCategoryShop;
import com.project.dto.request.CategoryRequest;
import com.project.dto.request.CategoryShopRequest;
import com.project.dto.request.RemoveProductFromCategoryShop;
import com.project.exception.CategoryShopException;
import com.project.exception.ShopException;
import com.project.model.CategoryShop;
import com.project.model.Product;
import com.project.model.Shop;
import com.project.repository.CategoryShopRepository;
import com.project.repository.ProductRepository;
import com.project.service.CategoryShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryShopServiceImpl implements CategoryShopService {

    private final CategoryShopRepository categoryShopRepository;
    private final ProductRepository productRepository;

    @Override
    public CategoryShop createCategory(CategoryShopRequest req, Shop shop) {
        CategoryShop categoryShop = new CategoryShop();
        categoryShop.setName(req.getName());
        categoryShop.setDescription(req.getDescription());
        categoryShop.setShop(shop);
        categoryShop.setStatus("AVAILABLE");
        return categoryShopRepository.save(categoryShop);
    }

    @Override
    public void deleteCategoryShop(Long categoryShopId) throws CategoryShopException {
        Optional<CategoryShop> opt = categoryShopRepository.findById(categoryShopId);
        if(opt.isPresent()){
            CategoryShop deleteCategory = opt.get();
            categoryShopRepository.deleteById(deleteCategory.getId());
        }else {
            throw new CategoryShopException("Not found with ID");
        }

    }
    @Override
    public List<CategoryShop> getAllCategory(Long shopId) {
        return categoryShopRepository.getAllCategoryShop(shopId);
    }

    @Override
    public void updateStatusCategory(Long categoryShopId) {
        Optional<CategoryShop> opt = categoryShopRepository.findById(categoryShopId);
        if(opt.isPresent()) {
            CategoryShop category = opt.get();
            if(category.getStatus().equals("AVAILABLE")){
                category.setStatus("HIDE");
            }
            else {
                category.setStatus("AVAILABLE");
            }
            categoryShopRepository.save(category);
        }
    }

    @Override
    public CategoryShop updateCategory(CategoryShopRequest req, Long categoryShopId) throws CategoryShopException {
        Optional<CategoryShop> opt = categoryShopRepository.findById(categoryShopId);
        if(opt.isPresent()){
            CategoryShop categoryShop = opt.get();
            categoryShop.setName(req.getName());
            categoryShop.setDescription(req.getDescription());
            return categoryShopRepository.save(categoryShop);
        }else {
            throw new CategoryShopException("Category not found");
        }

    }
    @Override
    public CategoryShop addProductToCategoryShop(AddProductToCategoryShop req) {
        // Tìm CategoryShop theo id
        Optional<CategoryShop> opt = categoryShopRepository.findById(req.getCategoryShopId());
        if (opt.isPresent()) {
            CategoryShop categoryShop = opt.get();
            List<Long> productIdsToAdd = req.getProductId();
            // Lặp qua từng ID sản phẩm và thêm vào danh sách sản phẩm của CategoryShop
            for (Long productId : productIdsToAdd) {
                // Tìm sản phẩm theo ID
                Optional<Product> productOpt = productRepository.findById(productId);
                if (productOpt.isPresent()) {
                    Product product = productOpt.get();
                    // Kiểm tra xem sản phẩm đã thuộc CategoryShop hay chưa
                    if (!categoryShop.getProducts().contains(product)) {
                        // Nếu chưa, thêm sản phẩm vào danh sách của CategoryShop
                        categoryShop.getProducts().add(product);
                        // Cập nhật CategoryShop trong sản phẩm
                        product.getCategoryShop().add(categoryShop);
                        // Lưu lại thay đổi trong cơ sở dữ liệu
                        productRepository.save(product);
                    }
                }
            }
            return categoryShopRepository.save(categoryShop);
        } else {
            return null;
        }
    }

    @Override
    public CategoryShop removeProductFromCategoryShop(RemoveProductFromCategoryShop req) {
        Optional<CategoryShop> optCategoryShop = categoryShopRepository.findById(req.getCategoryShopId());
        if (optCategoryShop.isPresent()) {
            CategoryShop categoryShop = optCategoryShop.get();
            // Tìm sản phẩm theo ID
            Optional<Product> optProduct = productRepository.findById(req.getProductId());
            if (optProduct.isPresent()) {
                Product product = optProduct.get();
                // Kiểm tra xem sản phẩm có thuộc CategoryShop không
                if (categoryShop.getProducts().contains(product)) {
                    // Xóa sản phẩm ra khỏi danh sách của CategoryShop
                    categoryShop.getProducts().remove(product);
                    // Xóa CategoryShop khỏi sản phẩm
                    product.getCategoryShop().remove(categoryShop);
                    // Lưu lại thay đổi trong cơ sở dữ liệu
                    productRepository.save(product);
                    return categoryShopRepository.save(categoryShop);
                } else {
                    // Sản phẩm không thuộc CategoryShop, không có gì để xóa
                    return categoryShop;
                }
            } else {
                // Không tìm thấy sản phẩm
                return categoryShop;
            }
        } else {
            // Không tìm thấy CategoryShop
            return null;
        }
    }


}
