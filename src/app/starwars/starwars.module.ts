import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarwarsRoutingModule } from './starwars-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule } from '@angular/forms';
import { CharacterviewComponent } from './characterview/characterview.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomepageComponent,
    FiltersComponent,
    NavbarComponent,
    CharacterviewComponent,
  ],
  imports: [
    CommonModule,
    StarwarsRoutingModule,
    MatIconModule,
    FormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
  ],
})
export class StarwarsModule {}
