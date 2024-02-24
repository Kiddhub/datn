package com.project.service.impl;

import com.project.config.DateTimeConfig;
import com.project.dto.request.CreateRatingReviewRequest;
import com.project.dto.request.ReplyRatingRequest;
import com.project.model.Product;
import com.project.model.Rating;
import com.project.model.User;
import com.project.repository.ProductRepository;
import com.project.repository.RatingRepository;
import com.project.service.RatingReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RatingReviewServiceImpl implements RatingReviewService {
    private final ProductRepository productRepository;
    private final RatingRepository ratingRepository;
    @Override
    public Rating createRatingAndReview(CreateRatingReviewRequest req, User user) {
        Optional<Product> opt = productRepository.findById(req.getProductId());
        if(opt.isPresent()){
            Rating rating = new Rating();
            Product product = opt.get();
            rating.setProduct(product);
            rating.setRating(req.getRating());
            rating.setReview(req.getReview());
            rating.setUser(user);
            rating.setCreatedAt(DateTimeConfig.formatDateTime(LocalDateTime.now()));
            return ratingRepository.save(rating);
        }
        return null;
    }

    @Override
    public List<Rating> getAllRating(Long productId) {
        return ratingRepository.findByProductId(productId);
    }

    @Override
    public List<Rating> getAllShopRating(Long shopId) {
        return ratingRepository.findRatingShopId(shopId);
    }

    @Override
    public Rating replyReview(Long ratingId, ReplyRatingRequest req) {
        Optional<Rating> opt = ratingRepository.findById(ratingId);
        if(opt.isPresent()){
            Rating rating = opt.get();
            rating.setReply(req.getReply());
            return ratingRepository.save(rating);
        }
        return null;
    }
}
