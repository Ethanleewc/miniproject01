import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../service/recipe.service';
import { Remark } from '../models/remark';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit, OnDestroy{
  form!: FormGroup;
  queryParams$! :  Subscription;
  recipeParam!: any;
  recipeTitle! : string;
  recipeId!: string;

  constructor(private activatedRoute: ActivatedRoute,  private formBuilder: FormBuilder,
    private recipeSvc: RecipeService, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.queryParams$ = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.recipeParam = queryParams['recipeParam'];
        console.log(this.recipeParam);
        this.recipeId = this.recipeParam;
      }
    );

  }

  saveRemark(){
    const remarkFormVal = this.form?.value['remark'];
    const r = {} as Remark;
    r.remarks = remarkFormVal;
    r.id = this.recipeId;
    console.log(r.remarks);

    this.recipeSvc.saveRemark(r);
    this.router.navigate(['/details', this.recipeId]);
  }

  private createForm(): FormGroup{
    return this.formBuilder.group({
      remark : this.formBuilder.control(''),  
    })
  }

  cancel(){
    this.router.navigate(['/details', this.recipeId]);
  }

  ngOnDestroy(): void{
    this.queryParams$.unsubscribe();
  }
}
