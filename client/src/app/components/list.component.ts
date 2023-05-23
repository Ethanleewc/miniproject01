import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
  cuisine = "";
  minCalories = "";
  maxCalories = "";
  param$! : Subscription;
  recipes! : Recipe[]
  constructor(private activatedRoute: ActivatedRoute,
    private recipeSvc: RecipeService, private router: Router){

  }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.cuisine = params['cuisine'];
        this.minCalories = params['minCalories'];
        this.maxCalories = params['maxCalories'];
        console.log(this.cuisine);
        const l = await this.recipeSvc.getRecipes(this.cuisine, this.minCalories, this.maxCalories);
        console.log(l);
        if (l === undefined || l.length == 0) {
          this.router.navigate(['/'])
        }else{
            this.recipes = l;
        }
        
      }
    );

  }

  ngOnDestroy(): void {
      
  }

}
