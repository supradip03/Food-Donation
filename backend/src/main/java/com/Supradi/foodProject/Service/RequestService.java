package com.Supradi.foodProject.Service;

import com.Supradi.foodProject.Model.*;
import com.Supradi.foodProject.Repository.FoodRepo;
import com.Supradi.foodProject.Repository.RequestRepo;
import com.Supradi.foodProject.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepo requestRepo;

    @Autowired
    private FoodRepo foodRepo;

    @Autowired
    private UserRepo userRepo;


    public ResponseEntity<String> requestFoodByNgos(Long foodId) {
        Foods food = foodRepo.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users ngo = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if ((!food.getStatus().equals("AVAILABLE")) ||
                (food.getExpiryTime() != null && food.getExpiryTime().isBefore(LocalDateTime.now()))) {
            throw new RuntimeException("Food already taken or expired");
        }

        if (ngo.getRole() != Role.NGO) {
            throw new RuntimeException("Only NGOs can requests for foods");
        }

        boolean exists = requestRepo.existsByFood_IdAndUser_Id(foodId, ngo.getId());

        if (exists) {
            throw new RuntimeException("You already requested this food");
        }

        Request request = new Request();
        request.setFood(food);
        request.setUser(ngo);
        request.setStatus(RequestStatus.PENDING);
        requestRepo.save(request);
        return new ResponseEntity<>("Added Request", HttpStatus.OK);
    }


    public ResponseEntity<List<Request>> getRequestsByNgo() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users ngo = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Request> requests = requestRepo.findByUserId(ngo.getId());

        return new ResponseEntity<>(requests, HttpStatus.OK);
    }


//    This 3 are accessed by USER (Self) and RESTAURANT

    public ResponseEntity<String> acceptRequest(Long requestId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users currentUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Request req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found :("));

        if (!req.getFood().getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not allowed to accept this request");
        }

        if (req.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("Request already processed");
        }

        req.setStatus(RequestStatus.ACCEPTED);
        Foods food = req.getFood();
        food.setStatus("TAKEN");
        foodRepo.save(food);
        requestRepo.save(req);

        return new ResponseEntity<>("Accepted Request :)", HttpStatus.OK);
    }


    public ResponseEntity<String> completeRequest(Long requestId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users currentUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Request req = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found :("));

        if (!req.getFood().getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not allowed to complete this request");
        }

        if (req.getStatus() == RequestStatus.ACCEPTED) {
            req.setStatus(RequestStatus.COMPLETED);
            requestRepo.save(req);
            return new ResponseEntity<>("Completed Request :)", HttpStatus.OK);
        }
        return new ResponseEntity<>("First, Accept the Request !", HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity<List<Request>> getAllRequestsForMyFood() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users currentUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


//        System.out.println("Logged in user: " + email);
        List<Request> requests = requestRepo.findByFood_User_Id(currentUser.getId());

        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getRequestCount() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Users currentUser = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        int count = 0;

            if (currentUser.getRole().name().equals("NGO")) {
                count = requestRepo.countByUserIdAndStatus(currentUser.getId(), "ACCEPTED");
            } else {
                count = requestRepo.countByFoodUserIdAndStatus(currentUser.getId(), "PENDING");
            }

            return new ResponseEntity<>(count, HttpStatus.OK);


//            return new ResponseEntity<>(0, HttpStatus.OK); // safe fallback

    }
}

