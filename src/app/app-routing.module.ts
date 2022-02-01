import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CalendarResolverService } from './services/calendar-resolver.service';
import { CalendarGuardService } from './services/calendar-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calendar',
    resolve: {
      holidays: CalendarResolverService
    },
    canActivate: [CalendarGuardService],
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
