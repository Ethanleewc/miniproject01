package com.eatright.server.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Remarks {

    private String recipeId;

    private String remarks;

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public static Remarks create(Document d) {
        Remarks r = new Remarks();
        r.setRecipeId(d.getObjectId("recipeId").toString());
        r.setRemarks(d.getString("remarks"));
        return r;
    }
    
    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("recipeId", getRecipeId())
                .add("remarks", getRemarks())
                .build(); 
    }
    
}
