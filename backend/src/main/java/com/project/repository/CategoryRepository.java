package com.project.repository;

import com.project.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String name);

    @Query("Select c from Category c Where c.name=:name And c.parentCategory.name=:parentCategoryName")
    Category findByNameAndParent(@Param("name")String name,
                                 @Param("parentCategoryName")String parentCategoryName);
    @Query("Select c from Category c Where c.level = 0")
    List<Category> findParentCategory();

    @Query("SELECT c FROM Category c WHERE c.parentCategory.id = :categoryId")
    List<Category> findSubCategory(@Param("categoryId") Long categoryId);
}
