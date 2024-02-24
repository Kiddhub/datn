package com.project.service;

import com.project.dto.request.CategoryRequest;
import com.project.dto.request.SubCategoryRequest;
import com.project.dto.request.UpdateCategoryRequest;
import com.project.exception.CategoryException;
import com.project.model.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryRequest req) throws CategoryException;
    Category updateCategory(Long categoryId, UpdateCategoryRequest req) throws CategoryException;
    Category createSubCategory(SubCategoryRequest req);
    void deleteCategory(Long categoryId) throws CategoryException;
    List<Category> getParentCategory();
    List<Category> getSubCategory(Long categoryId);
}
