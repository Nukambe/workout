import {Routes} from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {LogComponent} from "./log/log.component";
import {WorkoutComponent} from "./workout/workout.component";
import {HomeComponent} from "./home/home.component";
import {CreateWorkoutComponent} from "./create-workout/create-workout.component";
import { loggedInGuard } from './guards/logged-in.guard';
import { ReportsComponent } from './reports/reports.component';
import { SignoutComponent } from './signout/signout.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "signout", component: SignoutComponent, canActivate: [loggedInGuard] },
  { path: "log", component: LogComponent, canActivate: [loggedInGuard] },
  { path: "log/create", component: CreateWorkoutComponent, canActivate: [loggedInGuard] },
  { path: "log/:id", component: WorkoutComponent, canActivate: [loggedInGuard] },
  { path: "reports", component: ReportsComponent, canActivate: [loggedInGuard] },
  { path: "**", redirectTo: "" }
];
