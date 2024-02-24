package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @Embedded
    @ElementCollection
    @Column(name = "tags")
    private List<Tag> tags;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "shop_id",nullable = false)
    private Shop shop;
    private String status;
    @Embedded
    @ElementCollection
    @Column(name = "sizes")
    private Set<Size> sizes = new HashSet<>();
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToMany
    @JoinTable(
            name = "product_category_shop",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_shop_id"))
    private List<CategoryShop> categoryShop;
    private String discountType;
    private Long discountNumber;
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Report> report;
}
