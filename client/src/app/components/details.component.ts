import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';
import { Remark } from '../models/remark';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy{

  recipeId =  "";
  recipeTitle = "";
  param$! :  Subscription;
  recipe! : Recipe;
  card! : Card;
  remarks!: Remark[];

  constructor(private activatedRoute: ActivatedRoute, 
    private recipeSvc: RecipeService, private router: Router){

  }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
       async (params) => {
        this.recipeId = params['recipeId'];
        console.log(this.recipeId);
        const l = await this.recipeSvc.getRecipesDetails(this.recipeId);
        this.card = l.details;
        const ll = await this.recipeSvc.getRecipesRemarks(this.recipeId);
        console.log(ll);
        this.remarks = ll;
        
      }
    );

  }

  addRemark(){
    const queryParams: Params = { recipeParam: this.recipeId };
    this.router.navigate(['/remark'], {queryParams : queryParams})
  }

  deleteRemark(){
    this.recipeSvc.deleteRemark(this.recipeId);
  }

  ngOnDestroy(): void{
    this.param$.unsubscribe();
  }

}
