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
  cuisineType = "";
  minCarbs = "";
  maxCarbs = "";
  param$! : Subscription;
  recipes! : Recipe[]
  constructor(private activatedRoute: ActivatedRoute,
    private recipeSvc: RecipeService, private router: Router){

  }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.cuisineType = params['cuisineType'];
        this.minCarbs = params['minCarbs'];
        this.maxCarbs = params['maxCarbs'];
        console.log(this.cuisineType);
        const l = await this.recipeSvc.getRecipes(this.cuisineType, this.minCarbs, this.maxCarbs);
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