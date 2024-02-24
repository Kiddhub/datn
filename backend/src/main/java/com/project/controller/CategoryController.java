package com.project.controller;

import com.project.dto.request.CategoryRequest;
import com.project.dto.request.SubCategoryRequest;
import com.project.dto.request.UpdateCategoryRequest;
import com.project.dto.response.ApiResponse;
import com.project.exception.CategoryException;
import com.project.model.Category;
import com.project.repository.CategoryRepository;
import com.project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")

public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequest req)
                                                    throws CategoryException {
        Category category = categoryService.createCategory(req);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Category>> getAllCategory(){
        List<Category> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping("/parent")
    public ResponseEntity<List<Category>> getAllParentCategory(){
        List<Category> categories = categoryService.getParentCategory();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }
    @GetMapping("/parent/{categoryId}")
    public ResponseEntity<List<Category>> getAllSubCategory(@PathVariable Long categoryId){
        List<Category> categories = categoryService.getSubCategory(categoryId);
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }
    @PostMapping("/createSub")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createSubCategory(@RequestBody SubCategoryRequest req){
        Category category = categoryService.createSubCategory(req);
        return new ResponseEntity<>(category,HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long categoryId) throws CategoryException {
        categoryService.deleteCategory(categoryId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Delete successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PutMapping("/update/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> updateCategory(@RequestBody UpdateCategoryRequest req,
                                                   @PathVariable Long categoryId) throws CategoryException {
        Category category = categoryService.updateCategory(categoryId,req);
        return new ResponseEntity<>(category,HttpStatus.ACCEPTED);

    }
}
