import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public monthlyForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.monthlyForm = this.formBuilder.group({
      date: new FormControl('', Validators.compose([ Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')])),
      days: new FormControl('', Validators.compose([ Validators.required, Validators.pattern('^[1-9]\\d*$')])),
      code: new FormControl('', Validators.compose([ Validators.required ]))
    });
  }

  goToCalendar() {
    const navigationExtras: NavigationExtras = {
      state: {
        startDate: this.monthlyForm.controls['date'].value,
        days: this.monthlyForm.controls['days'].value,
        locale: this.monthlyForm.controls['code'].value,
      }
    };
    this.router.navigate(['/calendar'], navigationExtras);
  }

}
