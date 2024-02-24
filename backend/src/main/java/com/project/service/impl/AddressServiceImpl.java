package com.project.service.impl;

import com.project.dto.request.CreateAddressRequest;
import com.project.model.Address;
import com.project.model.User;
import com.project.repository.AddressRepository;
import com.project.repository.UserRepository;
import com.project.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Address createNewAddress(CreateAddressRequest request, User user) {
        Address address = new Address();
        address.setUser(user);
        address.setFirstName(request.getFirstName());
        address.setLastName(request.getLastName());
        address.setMobile(request.getMobile());
        address.setCity(request.getCity());
        address.setAddress(request.getAddress());
        userRepository.save(user);
        return addressRepository.save(address);
    }

    @Override
    public List<Address> getUserAddress(Long userId) {
        return addressRepository.findAddressUser(userId);
    }
}
