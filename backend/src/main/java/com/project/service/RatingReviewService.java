package com.project.service;

import com.project.dto.request.CreateRatingReviewRequest;
import com.project.dto.request.ReplyRatingRequest;
import com.project.model.Rating;
import com.project.model.User;

import java.util.List;

public interface RatingReviewService {
    Rating createRatingAndReview(CreateRatingReviewRequest req, User user);

    List<Rating> getAllRating(Long productId);

    List<Rating> getAllShopRating(Long shopId);

    Rating replyReview(Long ratingId, ReplyRatingRequest req);
}
