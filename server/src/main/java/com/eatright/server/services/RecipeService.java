package com.eatright.server.services;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eatright.server.models.Cards;
import com.eatright.server.models.Recipe;
import com.eatright.server.models.Remarks;
import com.eatright.server.repositories.MongoRepo;
import com.eatright.server.repositories.SqlRepo;

@Service
public class RecipeService {

    @Autowired
    private SpoonApiService spoonApiSvc;

    @Autowired
    private MongoRepo mongoRepo;

    @Autowired
    private SqlRepo sqlRepo;

    public Optional<List<Recipe>> getRecipe(String cuisine, Integer minCalories, Integer maxCalories) {
        return spoonApiSvc.getRecipes(cuisine, minCalories, maxCalories);
    }
    
    public Cards getRecipeDetails(String recipeId) throws IOException {
        Cards cc = null;
            Optional<Cards> c  = spoonApiSvc.getRecipeDetails(recipeId);
            cc = c.get();
            cc.setRemarks(this.getAllRemarks(recipeId));
        return cc;
    }

    public Remarks insertRemarks(Remarks r) {
        return mongoRepo.insertRemarks(r);
    }

    public List<Remarks> getAllRemarks(String rcpeId) {
        return mongoRepo.getAllRemarks(rcpeId);
    }

    public void deleteRemarks(String recipeId) {
        mongoRepo.deleteRemarks(recipeId);
    }

    public void sqlInsertRemarks(Integer recipeId, String remarks) throws SQLException, IOException {
        sqlRepo.uploadPost(recipeId, remarks);
    }

    public void sqlDeleteRemarks(String recipeId) throws SQLException, IOException {
        sqlRepo.deletePost(Integer.parseInt(recipeId));
    }
}
