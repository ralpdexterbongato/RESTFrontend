import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { TokenService } from './services/token.service';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const appRoutes: Routes = [
  {
    path: 'admin-panel',
    component: AdminpanelComponent,
    canActivate: [AuthGuard],
    data: { title: 'Admin panel' }
  },
  {
    path: 'admin-only',
    component: AdminLoginComponent,
    canActivate:[GuestGuard],
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
    path: 'about',
    component: LandingPageComponent,
    data: { title: 'Home' }
  },
  { path: '',
    redirectTo: 'about',
    pathMatch: 'full'
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
    AdminpanelComponent,
  ],
  imports: [
  BrowserModule,
  RouterModule.forRoot(appRoutes),
  FormsModule,
  HttpClientModule,
  ],
  providers: [
    ToasterService,
    TokenService,
    AuthGuard,
    GuestGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
