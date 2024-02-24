package com.project.service.impl;

import com.project.dto.request.CategoryRequest;
import com.project.dto.request.SubCategoryRequest;
import com.project.dto.request.UpdateCategoryRequest;
import com.project.exception.CategoryException;
import com.project.model.Category;
import com.project.repository.CategoryRepository;
import com.project.service.CategoryService;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Category createCategory(CategoryRequest req) throws CategoryException {
        Category category = new Category();

        category.setName(req.getName());
        category.setDescription(req.getDescription());
        category.setImageUrl(req.getImage());
        return categoryRepository.save(category);
    }
    public Category createSubCategory(SubCategoryRequest req){
        Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());
        Category secondLevel = categoryRepository.findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());
        if(secondLevel == null){
            Category secondLevelCategory = new Category();
            secondLevelCategory.setName(req.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(1);
            secondLevel = categoryRepository.save(secondLevelCategory);
        }
        if(req.getThirdLevelCategory().isEmpty()){
            return secondLevel;
        }else {
            Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(), secondLevel.getName());
            if(thirdLevel == null){
                Category thirdLevelCategory = new Category();
                thirdLevelCategory.setName(req.getThirdLevelCategory());
                thirdLevelCategory.setParentCategory(secondLevel);
                thirdLevelCategory.setLevel(2);
                thirdLevel = categoryRepository.save(thirdLevelCategory);
            }
            return thirdLevel;
        }

    }
    @Override
    public Category updateCategory(Long categoryId, UpdateCategoryRequest req) throws CategoryException {
        Optional<Category>opt = categoryRepository.findById(categoryId);
        if(opt.isPresent()){
            Category category = opt.get();
            category.setName(req.getName());
            return categoryRepository.save(category);
        }
        else {
            throw new CategoryException("Not found category with ID:" + categoryId);
        }
    }
    @Override
    public void deleteCategory(Long categoryId) throws CategoryException {
        Optional<Category> opt =  categoryRepository.findById(categoryId);
        if(opt.isPresent()){
            Category category = opt.get();
            categoryRepository.deleteById(category.getId());
        }else {
            throw new CategoryException("Category not found with ID:");
        }
    }
    @Override
    public List<Category> getParentCategory() {
        return categoryRepository.findParentCategory();
    }
    @Override
    public List<Category> getSubCategory(Long categoryId) {
        return categoryRepository.findSubCategory(categoryId);
    }
}
