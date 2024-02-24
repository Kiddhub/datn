package com.project.controller;


import com.project.dto.request.ReplyRatingRequest;
import com.project.model.Rating;
import com.project.model.Shop;
import com.project.service.RatingReviewService;
import com.project.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/rating")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SHOP')")
public class ShopRatingController {
    private final RatingReviewService ratingReviewService;
    private final ShopService shopService;
    @GetMapping("/")
    public ResponseEntity<List<Rating>> getAllShopRatings(@RequestHeader("Authorization")String jwt){
        Shop shop = shopService.findByToken(jwt);
        List<Rating> ratings = ratingReviewService.getAllShopRating(shop.getId());
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
    @PutMapping("/{ratingId}")
    public ResponseEntity<Rating> replyReview(@RequestBody ReplyRatingRequest req,
                                              @PathVariable Long ratingId){
        Rating rating = ratingReviewService.replyReview(ratingId,req);
        return new ResponseEntity<>(rating,HttpStatus.OK);
    }
}
