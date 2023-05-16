import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  cuisineType?: string;
  minCalories?: number;
  maxCalories?: number;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {}

  search(): void {
    const cuisineType = this.form?.value['cuisineType'];
    const minCalories = this.form?.value['minCalories'];
    const maxCalories = this.form?.value['maxCalories'];
    this.router.navigate(['/list', cuisineType, minCalories, maxCalories]);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      cuisineType: this.formBuilder.control('', Validators.required),
      minCalories: this.formBuilder.control('', [Validators.required, Validators.min(1), Validators.max(9999)]),
      maxCalories: this.formBuilder.control('', [Validators.required, Validators.min(1), Validators.max(9999)])
    }, { validators: this.validateCarbs });
  }

  private validateCarbs(group: FormGroup): { [key: string]: any } | null {
    const minCalories = group.get('minCalories')?.value;
    const maxCalories = group.get('maxCalories')?.value;

    if (minCalories > maxCalories) {
      return { invalidRange: true };
    }

    return null;
  }
}
