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

  getRecipes(cuisineType: string, minCarbs: string, maxCarbs: string): Promise<any>{
    const params = new HttpParams()
        .set("cuisineType", cuisineType)
        .set("minCarbs", minCarbs)
        .set("maxCarbs", maxCarbs);

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

  saveRemark(c:Remark) : Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body=JSON.stringify(c);
    console.log("Remark saved !");
    return lastValueFrom(this.httpClient.post<Remark>(this.API_URI+"/" + c.id, body, {headers: headers}));
  }
}