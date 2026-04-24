package com.Supradi.foodProject.Service;

import com.Supradi.foodProject.Model.Foods;
import com.Supradi.foodProject.Model.Users;
import com.Supradi.foodProject.Repository.FoodRepo;
import com.Supradi.foodProject.Repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class FoodService {

    private final FoodRepo foodRepo;
    private final UserRepo userRepo;

    public FoodService(FoodRepo foodRepo, UserRepo userRepo) {
        this.foodRepo = foodRepo;
        this.userRepo = userRepo;
    }

    public ResponseEntity<String> addFood(Foods food) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        food.setUser(user);
        food.setStatus("AVAILABLE");

        foodRepo.save(food);
        return new ResponseEntity<>("Food Added", HttpStatus.OK);
    }

    public ResponseEntity<List<Foods>> getAllFood() {
        List<Foods> foods = foodRepo.findAll();
        for (Foods food : foods) {
            if (food.getExpiryTime() != null &&
                    food.getExpiryTime().isBefore(LocalDateTime.now())) {
                food.setStatus("EXPIRED");
            }
        }
        List<Foods> availableFoods = foods.stream()
                .filter(f -> f.getStatus().equals("AVAILABLE"))
                .toList();

        return new ResponseEntity<>(availableFoods, HttpStatus.OK);
    }

    public ResponseEntity<List<Foods>> getAllUserFood() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Foods> foods = foodRepo.findByUserId(user.getId());

        List<Foods> availableFoods = foods.stream()
                .filter(f -> f.getStatus().equals("AVAILABLE"))
                .toList();

        return new ResponseEntity<>(availableFoods, HttpStatus.OK);
    }

    public ResponseEntity<String> updateFood(Foods updatedFood, Long foodId) {

        // get logged-in user
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users currentUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //  get food
        Foods food = foodRepo.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        // CHECK OWNER
        if (!food.getUser().getId().equals(currentUser.getId())) {
            return new ResponseEntity<>("You are not allowed to update this food", HttpStatus.FORBIDDEN);
        }

        // update fields
        food.setTitle(updatedFood.getTitle());
        food.setQuantity(updatedFood.getQuantity());
        food.setLocation(updatedFood.getLocation());
        food.setExpiryTime(updatedFood.getExpiryTime());
        food.setStatus(updatedFood.getStatus());

        foodRepo.save(food);

        return new ResponseEntity<>("Updated successfully", HttpStatus.OK);
    }


    public ResponseEntity<Void> deleteFood(Long foodId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Foods food = foodRepo.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        if (!food.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to delete this food");
        }

        foodRepo.deleteById(foodId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Foods> getOneFood(Long foodId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Foods food = foodRepo.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        if (!food.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to update this food");
        }

        return new ResponseEntity<>(food, HttpStatus.OK);
    }
}

