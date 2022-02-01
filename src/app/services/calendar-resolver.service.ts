import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarResolverService {
  authenticationState = new BehaviorSubject(null);
  api_url: string = 'https://holidayapi.com/v1/holidays';
  startDate: Date;
  totalDays: number;
  locale: string;
  arrayRangeDates;

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  isAuthenticated() {
    return this.authenticationState.getValue();
  }

  resolve(route?: ActivatedRouteSnapshot) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.startDate = this.router.getCurrentNavigation().extras.state.startDate;
        this.totalDays = this.router.getCurrentNavigation().extras.state.days;
        this.locale = this.router.getCurrentNavigation().extras.state.locale;
      }
    });

    let loading: HTMLIonLoadingElement;

    this.loadingController.create({
      message: 'Loading...'
    }).then(res => {
      loading = res;
      loading.present();
    });

    return this.http.get(this.api_url+'?pretty&key=6747e6a4-4d27-45a7-8668-1d58d01c2571&country='+this.locale+'&year=2021')
    .pipe(
      tap((response: any) => {
        loading.dismiss();
        this.authenticationState.next(true);
        let startTime = new Date(new Date(this.startDate).setHours(24));
        response.startDate = startTime.setDate(startTime.getDate() + 0);
        response.endDate = startTime.setDate(startTime.getDate() + this.totalDays - 1);
        response.arrayDatesRange = this.getArrayDates();
        response.totalDays = this.totalDays;
        response.locale = this.locale;
        return response;
      }),
      catchError(error => {
        loading.dismiss();
        this.authenticationState.next(false);
        throw new Error(error);
      })
    );
  }

  getArrayDates() {
    this.arrayRangeDates = [];
    for(var i = 0; i < this.totalDays; i ++){
      const startTime = new Date(new Date(this.startDate).setHours(12));
      const date = startTime.setDate(startTime.getDate() + i);
      this.arrayRangeDates.push(date);
    }
    return this.arrayRangeDates;
  }

}
