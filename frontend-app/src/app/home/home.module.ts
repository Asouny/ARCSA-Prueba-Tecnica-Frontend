import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, HomeRoutingModule, MatCardModule, MatButtonModule],
})
export class HomeModule {}
