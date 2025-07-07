package com.university.portal.config;

import com.university.portal.model.ERole;
import com.university.portal.model.Role;
import com.university.portal.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        if (roleRepository.findByName(ERole.ROLE_STUDENT).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_STUDENT));
        }
        
        if (roleRepository.findByName(ERole.ROLE_FACULTY).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_FACULTY));
        }
        
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
    }
}