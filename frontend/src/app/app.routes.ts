import { Routes } from '@angular/router';

// 1. Import your new components
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { HomeComponent } from './pages/home/home';

// 2. Define the new routes
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {path: 'home', component: HomeComponent},
  
  // We'll change this later to be our main todo page
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login
  { path: '**', redirectTo: '/login' } // Redirect any other bad URL to login
];