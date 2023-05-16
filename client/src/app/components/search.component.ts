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
  minCarbs?: number;
  maxCarbs?: number;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {}

  search(): void {
    const cuisineType = this.form?.value['cuisineType'];
    const minCarbs = this.form?.value['minCarbs'];
    const maxCarbs = this.form?.value['maxCarbs'];
    this.router.navigate(['/list', cuisineType, minCarbs, maxCarbs]);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      cuisineType: this.formBuilder.control('', Validators.required),
      minCarbs: this.formBuilder.control('', [Validators.required, Validators.min(1), Validators.max(9999)]),
      maxCarbs: this.formBuilder.control('', [Validators.required, Validators.min(1), Validators.max(9999)])
    }, { validators: this.validateCarbs });
  }

  private validateCarbs(group: FormGroup): { [key: string]: any } | null {
    const minCarbs = group.get('minCarbs')?.value;
    const maxCarbs = group.get('maxCarbs')?.value;

    if (minCarbs > maxCarbs) {
      return { invalidRange: true };
    }

    return null;
  }
}
