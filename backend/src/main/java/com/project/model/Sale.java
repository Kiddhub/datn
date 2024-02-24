package com.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDateTime timeStart;
    private LocalDateTime timeEnd;
    private String description;
    @OneToMany(mappedBy = "sale",cascade = CascadeType.ALL)
    @Column(name = "sale_items")
    private List<SaleItem> saleItems;
    private String discountType;
    private Long discountNumber;
    private String status;
}
