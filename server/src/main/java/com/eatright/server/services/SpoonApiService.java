package com.eatright.server.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.eatright.server.models.Cards;
import com.eatright.server.models.Recipe;

@Service
public class SpoonApiService {
    
    @Value("${miniproject01.spoonacular.api.url}")
    private String spoonApiUrl;

    @Value("${miniproject01.spoonacular.api.key}")
    private String spoonApiKey;

    public Optional<List<Recipe>> getRecipes(String cuisine, Integer minCalories, Integer maxCalories) {
        ResponseEntity<String> resp = null;
        List<Recipe> c = null;
        System.out.println(spoonApiKey);

        String spoonRecipeApiUrl = UriComponentsBuilder
                                    .fromUriString(spoonApiUrl + "complexSearch")
                                    .queryParam("cuisine", cuisine)
                                    .queryParam("minCalories", minCalories)
                                    .queryParam("maxCalories", maxCalories)
                                    .queryParam("apiKey", spoonApiKey.trim())
                                    .queryParam("number", 100)
                                    .toUriString();
        System.out.println(spoonRecipeApiUrl);
        RestTemplate template = new RestTemplate();
        resp = template.getForEntity(spoonRecipeApiUrl, String.class);
        System.out.println(resp);
        try {
            c = Recipe.create(resp.getBody());
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(c);
        if(c != null)
            return Optional.of(c);                        
        return Optional.empty();
    }

    public Optional<Cards> getRecipeDetails(String recipeId) 
            throws IOException{
        ResponseEntity<String> resp = null;
        Cards c = null;
        System.out.println(spoonApiKey);
        
        String spoonRecipeApiUrl = UriComponentsBuilder
                                    .fromUriString(spoonApiUrl + recipeId + "/card")
                                    .queryParam("apiKey", spoonApiKey.trim())
                                    .toUriString();
        System.out.println(spoonRecipeApiUrl);
        RestTemplate template = new RestTemplate();
        resp = template.getForEntity(spoonRecipeApiUrl,String.class);
        System.out.println(resp);
        List<Cards> cArr = Cards.create(resp.getBody());
        c = cArr.get(0);
        System.out.println(c);
        if(c != null)
            return Optional.of(c);                        
        return Optional.empty();
    }
}
