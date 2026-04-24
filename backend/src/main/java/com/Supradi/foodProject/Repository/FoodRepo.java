package com.Supradi.foodProject.Repository;

import com.Supradi.foodProject.Model.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepo extends JpaRepository<Foods, Long> {
    List<Foods> findByUserId(Long userId);
}
