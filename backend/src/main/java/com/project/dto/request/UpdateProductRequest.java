package com.project.dto.request;

import com.project.model.Size;
import com.project.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {
    private String name;
    private String description;
    private Set<Size> sizes = new HashSet<>();
    private String imageUrl;
    private List<Tag> tags;

}
