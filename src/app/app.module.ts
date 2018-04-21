import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LatestWorksComponent } from './latest-works/latest-works.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';

import { ToasterService } from './toaster-service.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';

import { TokenService } from './services/token.service';
import { SendLimitService } from './services/sendlimit.service';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { MyHttpInterceptor } from './my-http-interceptor';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';
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
  LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    })
  ],
  providers: [
    ToasterService,
    TokenService,
    SendLimitService,
    AuthGuard,
    GuestGuard,
    {
     provide: HTTP_INTERCEPTORS,
     useClass: MyHttpInterceptor,
     multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
