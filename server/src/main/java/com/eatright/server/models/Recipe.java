package com.eatright.server.models;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Recipe implements Serializable {

    private Integer id;
    private String title;
    private String image;
    private String calories;
    private String recipeCard;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getCalories() {
        return calories;
    }
    public void setCalories(String calories) {
        this.calories = calories;
    }
    public String getRecipeCard() {
        return recipeCard;
    }
    public void setRecipeCard(String recipeCard) {
        this.recipeCard = recipeCard;
    }

    public static Recipe createJson(JsonObject o) {
        Recipe r = new Recipe();

        r.id = o.getJsonNumber("id").intValue();
        r.title = o.getString("title");
        r.image = o.getString("image");
        
        JsonObject nutrition = o.getJsonObject("nutrition");
        JsonArray nutrients = nutrition.getJsonArray("nutrients");
        JsonObject caloriesNutrient = nutrients.getJsonObject(0);
        double caloriesAmount = caloriesNutrient.getJsonNumber("amount").doubleValue();
        String caloriesUnit = caloriesNutrient.getString("unit");
        String caloriesInfo = caloriesNutrient.getString("name") + ": " + caloriesAmount + caloriesUnit;

        r.calories = caloriesInfo;
        return r;
    }

    public static List<Recipe> create(String json) throws IOException {
        List<Recipe> recp = new LinkedList<>();
        try(InputStream is = new ByteArrayInputStream(json.getBytes())){
            JsonReader r = Json.createReader(is);
            JsonObject o = r.readObject();
            if(o.getJsonArray("results") != null)
                recp = o.getJsonArray("results").stream()
                    .map(v-> (JsonObject)v)
                    .map(v-> Recipe.createJson(v))
                    .toList(); 
        }
        return recp;
    }
    
    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("id", getId())
                .add("title", getTitle())
                .add("image", getImage())
                .add("nutrients", getCalories())
                .build();
    }
}
