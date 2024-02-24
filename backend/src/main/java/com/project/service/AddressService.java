package com.project.service;

import com.project.dto.request.CreateAddressRequest;
import com.project.model.Address;
import com.project.model.User;

import java.util.List;

public interface AddressService {
    Address createNewAddress(CreateAddressRequest request, User user);

    List<Address> getUserAddress(Long userId);
}
