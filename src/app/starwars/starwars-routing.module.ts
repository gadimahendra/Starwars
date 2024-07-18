import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CharacterviewComponent } from './characterview/characterview.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'characters/:id', component: CharacterviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarwarsRoutingModule {}
