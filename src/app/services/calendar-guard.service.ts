import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarResolverService } from '../services/calendar-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarGuardService {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private calendarResolverService: CalendarResolverService

  ) { }

  canActivate() {
    const isAuth = this.calendarResolverService.isAuthenticated();
    if (isAuth === null || !isAuth) {
      this.calendarResolverService.resolve().subscribe(api => {
        if (api.status === 200) {
          this.router.navigate(['/calendar']);
          return true;
        } else {
          this.showErrorAlert();
          return false;
        }
      },(error) => {
        this.showErrorAlert();
        return false;
      });
    } else {
      return true;
    }
  }

  showErrorAlert() {
    this.alertController.create({
      header: 'Sorry',
      subHeader: 'Guard prevents this',
      message: 'An error has occurred with the api request.',
      buttons: ['OK']
    }).then(alert => alert.present());
    this.router.navigate(['/home']);
  }
}
