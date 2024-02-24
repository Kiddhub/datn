package com.project.controller;

import com.project.dto.request.CreateRatingReviewRequest;
import com.project.model.Rating;
import com.project.model.User;
import com.project.service.RatingReviewService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/rating")
@RequiredArgsConstructor
public class UserRatingController {

    private final RatingReviewService ratingReviewService;

    private final UserService userService;
    @PostMapping("/new")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Rating> createRating(@RequestBody CreateRatingReviewRequest req, @RequestHeader("Authorization") String jwt){
        User user = userService.findUsernameByToken(jwt);
        Rating rating = ratingReviewService.createRatingAndReview(req,user);
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }
    @GetMapping("/{productId}")
    public ResponseEntity<List<Rating>> getAllRatingProduct(@PathVariable Long productId){
        List<Rating> ratings = ratingReviewService.getAllRating(productId);
        return new ResponseEntity<>(ratings,HttpStatus.OK);
    }
}
