package com.luv2code.spring_boot_ecommerce.Entity.dao;

import com.luv2code.spring_boot_ecommerce.Entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@RepositoryRestResource(collectionResourceRel = "countries", path="countries")
public interface CountryRepository  extends JpaRepository<Country, Integer> {

}
