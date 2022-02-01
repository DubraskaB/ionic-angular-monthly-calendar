import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild(CalendarComponent) calendar: CalendarComponent;
  title: string;
  holidaysList = [];
  eventSource = [];
  arrayDatesRange = [];
  startDate: Date;
  endDate: Date;
  totalDays: number;
  locale: string;

  calendarOptions = {
    mode: 'month',
    currentDate: null
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initCalendar();
  }

  ngOnInit() { }

  initCalendar() {
    this.holidaysList = this.route.snapshot.data['holidays'].holidays;
    this.startDate = new Date(new Date(this.route.snapshot.data['holidays'].startDate));
    this.endDate = new Date(new Date(this.route.snapshot.data['holidays'].endDate).setHours(24));
    this.totalDays = this.route.snapshot.data['holidays'].totalDays;
    this.locale = this.route.snapshot.data['holidays'].locale;
    this.calendarOptions.currentDate = this.startDate.setHours(12);
    this.arrayDatesRange = this.route.snapshot.data['holidays'].arrayDatesRange;;
    this.eventSource = this.createHolidaysEvents();
  }

  inviewTitleChanged(title) {
    this.title = title;
  }

  goToNextMonth() {
    this.calendar.slideNext();
  }

  goToPrevMonth() {
    this.calendar.slidePrev();
  }

  createHolidaysEvents() {
    var events = [];
    var hasHoliday;
    var namesOfHolidays;
    for (let date of this.arrayDatesRange) {
      var startTime = new Date(new Date(date).setHours(24));
      if(startTime.getDay() === 6 || startTime.getDay() === 0) { // Weekend days    
        hasHoliday = false;
        namesOfHolidays = '';
        this.holidaysList.forEach(holiday => {
          let dateHoliday = new Date(new Date(holiday.date).setHours(24));
          if(startTime.getTime() === dateHoliday.getTime()) {
            hasHoliday = true;
            namesOfHolidays += ' | ' + holiday.name;
          }
        });
        if(!hasHoliday){
          events.push({
            title: 'Weekend Day',
            startTime: startTime,
            endTime: startTime,
            allDay: true,
            eventColor: 'weekend'
          });
        } else {
          events.push({
            title: namesOfHolidays,
            startTime: startTime,
            endTime: startTime,
            allDay: true,
            eventColor: 'holiday'
          });
        }
      } else { // Week days
        hasHoliday = false;
        namesOfHolidays = '';
        this.holidaysList.forEach(holiday => {
          let dateHoliday = new Date(new Date(holiday.date).setHours(24));
          if(startTime.getTime() === dateHoliday.getTime()) {
            hasHoliday = true;
            namesOfHolidays += ' | ' + holiday.name;
          }
        });
        if(!hasHoliday) {
            events.push({
              title: 'Week Day',
              startTime: startTime,
              endTime: startTime,
              allDay: true,
              eventColor: 'week'
            });
        } else {
          events.push({
            title: namesOfHolidays,
            startTime: startTime,
            endTime: startTime,
            allDay: true,
            eventColor: 'holiday'
          });
        }
      }
    }
    return events;
  }

  markDisabled = (date: Date) => {
    let startDate = new Date(new Date(this.startDate));
    let endDate = new Date(new Date(this.endDate));
    return date < startDate || endDate < date;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
