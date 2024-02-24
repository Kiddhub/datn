package com.project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryRequest {
    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;
}
