package com.Supradi.foodProject.Repository;

import com.Supradi.foodProject.Model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepo extends JpaRepository<Request, Long> {
    List<Request> findByUserId(Long ngoId);

    boolean existsByFood_IdAndUser_Id(Long foodId, Long id);

    List<Request> findByFood_User_Id(Long id);

    int countByUserIdAndStatus(Long id, String accepted);

    int countByFoodUserIdAndStatus(Long id, String pending);
}
