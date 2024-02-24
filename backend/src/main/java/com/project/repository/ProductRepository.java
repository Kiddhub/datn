package com.project.repository;

import com.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId")
    List<Product> findByShopId(@Param("shopId") Long shopId);

    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId " +
            "AND (:name IS NULL OR p.name LIKE CONCAT('%', :name, '%')) " +
            "AND (:status IS NULL OR p.status = :status)")
    List<Product> findByNameAndStatus(@Param("shopId") Long shopId,
                                      @Param("name") String name,
                                      @Param("status") String status);
    @Query("SELECT p FROM Product p JOIN p.tags t WHERE t.name = :tag AND (p.status IS NULL OR p.status NOT IN ('REQUEST', 'DENY'))")
    List<Product> findByTag(@Param("tag") String tag);

    @Query(value =
            "WITH RECURSIVE CategoryTree AS (" +
                    "  SELECT id, parent_category_id, name " +
                    "  FROM category " +
                    "  WHERE id = :categoryId " +
                    "  UNION ALL " +
                    "  SELECT c.id, c.parent_category_id, c.name " +
                    "  FROM category c " +
                    "  JOIN CategoryTree ct ON c.parent_category_id = ct.id" +
                    ")" +
                    "SELECT p.* " +
                    "FROM product p " +
                    "JOIN CategoryTree ct ON p.category_id = ct.id OR p.category_id = :categoryId " +
                    "WHERE p.status NOT IN ('REQUEST', 'DENY')",
            nativeQuery = true)
    List<Product> findProductByCategory(@Param("categoryId") Long categoryId);


    @Query("SELECT p FROM Product p " +
            "JOIN p.category c " +
            "LEFT JOIN p.ratings r " +
            "WHERE (:categoryId IS NULL OR p.category.id = :categoryId OR " +
            "(c.parentCategory.id = :categoryId AND p.category.id = c.id)) " +
            "GROUP BY p " +
            "HAVING (:ratingValue IS NULL OR AVG(r.rating) > :ratingValue)" +
            "AND (p.status IS NULL OR p.status NOT IN ('REQUEST', 'DENY'))")
    List<Product> findProductByRatingAndSubCategory(
            @Param("categoryId") Long categoryId,
            @Param("ratingValue") Double ratingValue
    );

    @Query("SELECT p FROM Product p " +
            "JOIN p.category c " +
            "WHERE (:categoryId IS NULL OR p.category.id = :categoryId OR " +
            "(c.parentCategory.id = :categoryId AND p.category.id = c.id))")
    List<Product> findProductsByCategoryIdOrParentCategoryId(
            @Param("categoryId") Long categoryId
    );

    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId AND (p.status IS NULL OR p.status NOT IN ('REQUEST', 'DENY'))")
    List<Product> userFindByShopId(@Param("shopId") Long shopId);

    @Query("SELECT p FROM Product p JOIN p.categoryShop cs WHERE cs.id = :categoryShopId")
    List<Product> findByCategoryShop(@Param("categoryShopId") Long categoryShopId);

    @Query("SELECT p FROM Product p WHERE p.shop.id = :shopId " +
            "AND (:name IS NULL OR LOWER(p.name) LIKE LOWER(concat('%', :name, '%'))) " +
            "AND (p.status IS NULL OR p.status NOT IN ('REQUEST', 'DENY'))")
    List<Product> findProductByNameAndShopId(@Param("name") String name, @Param("shopId") Long shopId);
    @Query("SELECT p FROM Product p " +
            "WHERE p.shop.id = :shopId " +
            "AND p.status = 'AVAILABLE' " +
            "AND NOT EXISTS (SELECT 1 FROM SaleItem si WHERE si.product = p AND si.sale.id = :saleId)")
    List<Product> findAvailableProductsByShopIdNotInSale(@Param("shopId") Long shopId, @Param("saleId") Long saleId);

    @Query("SELECT p FROM Product p WHERE p.status = 'AVAILABLE'")
    List<Product> findAllProductsAvailable();

    @Query("SELECT p FROM Product p WHERE " +
            "(:name IS NULL OR p.name LIKE CONCAT('%', :name, '%')) " +
            "AND p.status = 'AVAILABLE'")
    List<Product> findByName(@Param("name") String name);

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    List<Product> findByCategory(@Param("categoryId")Long categoryId);
















}
