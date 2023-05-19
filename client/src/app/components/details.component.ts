import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';
import { Remark } from '../models/remark';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Card } from '../models/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../models/email';

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
  shareForm!: FormGroup;
  recipient?: String;
  subject?: String;
  msgBody?: String;
  emailSent = false;

  constructor(private activatedRoute: ActivatedRoute, 
    private recipeSvc: RecipeService, private router: Router, private formBuilder: FormBuilder){

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

    this.shareForm = this.createForm();

  }

  shareRecipe(): void {
    const recipientFormVal = this.shareForm?.value['recipient'];
    const subjectFormVal = this.shareForm?.value['subject'];
    const msgBodyFormVal = this.card.recipeCardImage;

    const e = {} as Email;
    e.recipient = recipientFormVal;
    e.subject = subjectFormVal;
    e.msgBody = msgBodyFormVal;

    this.recipeSvc.sendEmail(e)
      .then(() => {
        this.emailSent = true;
        console.log('Email sent!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      recipient: this.formBuilder.control('', [Validators.required, Validators.email]),
      subject: this.formBuilder.control('', Validators.required),
    });
  }

  addRemark(){
    const queryParams: Params = { recipeParam: this.recipeId };
    this.router.navigate(['/remark'], {queryParams : queryParams})
  }

  goBack(){
    this.router.navigate(['/'])
  }

  deleteRemark(){
    this.recipeSvc.deleteRemark(this.recipeId);
    const queryParams: Params = { recipeParam: this.recipeId };
    this.router.navigate(['/remark'], {queryParams : queryParams})
  }

  ngOnDestroy(): void{
    this.param$.unsubscribe();
  }

}
