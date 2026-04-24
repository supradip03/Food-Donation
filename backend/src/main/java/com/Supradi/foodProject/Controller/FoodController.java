package com.Supradi.foodProject.Controller;

import com.Supradi.foodProject.Model.Foods;
import com.Supradi.foodProject.Service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodController {


    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("allFoods")
    public ResponseEntity<List<Foods>> showAllFoods(){
        return foodService.getAllFood();
    }

    @PostMapping("addFood")
    public ResponseEntity<String> addFood(@RequestBody Foods food) {
        return foodService.addFood(food);
    }

    @GetMapping("userFoods")
    public ResponseEntity<List<Foods>> showAllUserFoods(){
        return foodService.getAllUserFood();
    }

    @GetMapping("get/{food_Id}")
    public ResponseEntity<Foods> getOneFood(@PathVariable Long food_Id){
        return foodService.getOneFood(food_Id);
    }

    @PutMapping("update/{food_id}")
    public ResponseEntity<String> uppdateFood(@RequestBody Foods updatedFood, @PathVariable Long food_id){
        return foodService.updateFood(updatedFood,food_id);
    }


    @DeleteMapping("remove/{food_id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long food_id){
        return foodService.deleteFood(food_id);
    }
}
