package com.Supradi.foodProject.Controller;

import com.Supradi.foodProject.Model.Request;
import com.Supradi.foodProject.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("request")
public class RequestController {

    @Autowired
    private RequestService requestService;


    @PostMapping("/{foodId}")
    public ResponseEntity<String> requestFood(@PathVariable Long foodId) {
        return requestService.requestFoodByNgos(foodId);
    }


    @GetMapping("/myRequests")
    public ResponseEntity<List<Request>> getAllRequests() {
        return requestService.getRequestsByNgo();
    }

//    Below 3 are only for Self and Restaurant

    @PutMapping("/accept/{requestId}")
    public ResponseEntity<String> accept(@PathVariable Long requestId) {
        return requestService.acceptRequest(requestId);
    }


    @PutMapping("/complete/{requestId}")
    public ResponseEntity<String> complete(@PathVariable Long requestId) {
        return requestService.completeRequest(requestId);
    }

    @GetMapping("/foodRequests")
    public ResponseEntity<List<Request>> getAllRequestsForMyFood() {
        return requestService.getAllRequestsForMyFood();
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getRequestCount() {
        return requestService.getRequestCount();
    }
}
