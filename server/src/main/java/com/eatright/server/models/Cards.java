package com.eatright.server.models;

import java.io.IOException;
import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Cards {

    private String recipeCard;

    private List<Remarks> remarks;

    public String getRecipeCard() {
        return recipeCard;
    }

    public void setRecipeCard(String recipeCard) {
        this.recipeCard = recipeCard;
    }

    public List<Remarks> getRemarks() {
        return remarks;
    }

    public void setRemarks(List<Remarks> remarks) {
        this.remarks = remarks;
    }
    
    public static List<Cards> create(String json) throws IOException {
        List<Cards> c = new LinkedList<>();
        try (JsonReader reader = Json.createReader(new StringReader(json))) {
            JsonObject jsonObject = reader.readObject();
            String recipeCardUrl = jsonObject.getString("url");
            Cards cd = new Cards();
            cd.setRecipeCard(recipeCardUrl);
            c.add(cd);
        }
        return c;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("recipeCardImage", getRecipeCard())
                .build();
    }
    
}
