# ionic-angular-monthly-calendar

## 📲 Application Description

This application shows a monthly calendar based on:
- A Start Date.
- The Number of days to display
- Literal Country Code

When the calendar is displayed the days are color coded as follows:

- A. Weekends are yellow.
- B. Weekdays are green.
- C. Holidays are orange.
- D. Invalid days are hidden and the background must be grey. Invalid days are defined as:
    - Any day of the week prior to the Start date.
    - Any day of the week after the last day borrowed.
    - Any day before the first day of the month (if the calendar extends to another month).

Click to see more information about a specific day in the calendar, you can see the name of the holiday, if it is a day of the week or a day of the weekend.

### **API**
IMPORTANT: 📢

In this API, FREE accounts are limited to last year's historical data only.

This means that the only valid year to test the dates related to holidays is the year **2021**

See more [Holiday API](https://holidayapi.com)

## 📝 Requirements

1. node 17.3.0
2. npm v8.3.2
3. @ionic/cli@6.16.3
4. @angular/cli@13.0.4

## 🚀 Local Deployment
## Steps

1. Clone the repository.
```
git clone https://github.com/DubraskaB/ionic-angular-monthly-calendar
```
2. Enter the directory that contains the repository.
```
cd ionic-angular-monthly-calendar
```
3. Install the node packages.
```
npm install
```
4. Start the application.
```
ionic serve
```

## Autor ✒️
* **Dubraska Benitez**


