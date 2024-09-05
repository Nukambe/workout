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
  { path: "signout", component: SignoutComponent },
  { path: "log", component: LogComponent },
  { path: "log/create", component: CreateWorkoutComponent },
  { path: "log/:id", component: WorkoutComponent },
  { path: "reports", component: ReportsComponent },
  { path: "**", redirectTo: "" }
];
