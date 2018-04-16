import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LatestWorksComponent } from './latest-works/latest-works.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';

import { ToasterService } from './toaster-service.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
const appRoutes: Routes = [
  {
    path: 'admin-panel',
    component: AdminpanelComponent,
    data: { title: 'Admin panel' }
  },
  {
    path: 'admin-only',
    component: AdminLoginComponent,
    data: { title: 'Admin' }
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { title: 'Skills' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact me' }
  },
  {
    path: 'projects',
    component: LatestWorksComponent,
    data: { title: 'Projects' }
  },
  {
    path: '',
    component: LandingPageComponent,
    data: { title: 'Home' }
  },

];
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LatestWorksComponent,
    ContactComponent,
    SkillsComponent,
    AdminLoginComponent,
    AdminpanelComponent
  ],
  imports: [
  BrowserModule,
  RouterModule.forRoot(appRoutes),
  FormsModule,
  HttpClientModule
  ],
  providers: [
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
