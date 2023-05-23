import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { ListComponent } from './components/list.component';
import { DetailsComponent } from './components/details.component';
import { RemarksComponent } from './components/remarks.component';

const routes: Routes = [
  {path:'', component:SearchComponent },
  {path: 'list/:cuisine/:minCalories/:maxCalories', component: ListComponent },
  {path: 'details/:recipeId', component: DetailsComponent},
  {path: 'remark', component: RemarksComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
