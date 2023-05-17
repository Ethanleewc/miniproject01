import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Recipe } from '../models/recipe';
import { Remark } from '../models/remark';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private API_URI: string = "/api/recipes";

  constructor(private httpClient: HttpClient) { }

  getRecipes(cuisineType: string, minCalories: string, maxCalories: string): Promise<any>{
    const params = new HttpParams()
        .set("cuisineType", cuisineType)
        .set("minCalories", minCalories)
        .set("maxCalories", maxCalories);

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return lastValueFrom(this.httpClient
        .get<Recipe[]>(this.API_URI, {params: params, headers: headers}));
  }

  getRecipesDetails(recipeId: string): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return lastValueFrom(this.httpClient
        .get<Recipe[]>(this.API_URI+"/" + recipeId, {headers: headers}));
  }

  getRecipesRemarks(recipeId: string): Promise<Remark[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log("get all remarks !");
    return lastValueFrom(this.httpClient
        .get<Remark[]>(this.API_URI+"/remarks/" + recipeId, {headers: headers}));
  }

  saveRemark(r:Remark) : Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body=JSON.stringify(r);
    console.log("Remark saved !");
    return lastValueFrom(this.httpClient.post<Remark>(this.API_URI+"/" + r.id, body, {headers: headers}));
  }

  deleteRemark(recipeId: string): Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log("Remark deleted !");
    return lastValueFrom(this.httpClient.delete<Remark>(this.API_URI+"/remarks/" + recipeId, {headers: headers}));
  }
}
