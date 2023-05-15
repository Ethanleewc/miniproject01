package com.eatright.server.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eatright.server.models.Cards;
import com.eatright.server.models.Recipe;
import com.eatright.server.models.Remarks;
import com.eatright.server.services.RecipeService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@RestController
@RequestMapping(path="/api/recipes", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {
    private Logger logger = LoggerFactory.getLogger(RecipeRestController.class);

    @Autowired
    private RecipeService recpSvc;

    @GetMapping
    public ResponseEntity<String> getRecipes(
        @RequestParam(required=true) String cuisineType,
        @RequestParam(required=true) Integer maxCarbs,
        @RequestParam(required=true) Integer minCarbs) {

        JsonArray result = null;
        Optional<List<Recipe>> or = this.recpSvc.getRecipe(cuisineType, minCarbs, maxCarbs);
        List<Recipe> results = or.get(); 
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Recipe rp : results)
            arrBuilder.add(rp.toJSON());
        result = arrBuilder.build();
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body(result.toString());
    }

    @GetMapping(path="/{recipeId}")
    public ResponseEntity<String> getRecipeDetails(
        @PathVariable(required=true) String recipeId) throws IOException {
        Cards c = this.recpSvc.getRecipeDetails(recipeId);
        JsonObjectBuilder ocjBuilder = Json.createObjectBuilder();
        ocjBuilder.add("details" , c.toJSON());
        JsonObject result = ocjBuilder.build();
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body(result.toString());
    }

    @PostMapping(path="/{recipeId}")
    public ResponseEntity<String> saveRecipeRemarks(
        @RequestBody Remarks remarks, @PathVariable(required=true) String recipeId) throws SQLException {
        logger.info("save remarks > : " + recipeId);
        Remarks r = new Remarks();
        r.setRemarks(remarks.getRemarks());
        r.setRecipeId(recipeId);;
        Remarks e = this.recpSvc.insertRemarks(r);
        Integer recpId = Integer.parseInt(r.getRecipeId());
        String rmrks = r.getRemarks();
        try {
            recpSvc.sqlInsertRemarks(recpId, rmrks);
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body(e.toJSON().toString());
    }

    @GetMapping(path="/remarks/{recipeId}")
    public ResponseEntity<String> getRecipeRemarks(@PathVariable(required=true) String recipeId) {
        logger.info("Get All ...remarks");
        List<Remarks> aa = this.recpSvc.getAllRemarks(recipeId);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Remarks r : aa)
            arrBuilder.add(r.toJSON());
        JsonArray result = arrBuilder.build();
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body(result.toString());
    }

    @DeleteMapping(path="/remarks/{recipeId}")
    public ResponseEntity<String> deleteRecipeRemarks(@PathVariable(required=true) String recipeId) throws SQLException, IOException {
        logger.info("delete remarks > : " + recipeId);
        recpSvc.deleteRemarks(recipeId);
        recpSvc.sqlDeleteRemarks(recipeId);
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body("Remarks for recipe " + recipeId + " is deleted.");
}
}
