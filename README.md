# Starwars

## Star Wars

“Star Wars” application using [SWAPI]
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

### Requirements

- Home page
- When the user opens the application
- Then the user sees the list of “Star Wars” Characters and filter dropdown
- When you open any filter, it will show the details of the particular drodown
- If the opened dropdown contains more data, a second page will be called when the scrollbar reaches the bottom of the dropdown
- After selecting a particular option, press the "Filter" button to apply the filters
- You will then see the data according to the applied filters, with the characters displayed accordingly.
- To clear the filters, click on the "Clear" button
- Clicking on any character in the table will redirect you to character/:id, displaying the overall details of the selected character.
- Character View
- In the detailed character view, you can see information about the character with their image rendered on the left side
- On the right side, you can see:
- The movies in which the character acted.
- The vehicles they used.
- The starships they used.
- If the array length of vehicles, films, or starships is zero, that section will not be rendered.
- Clicking the back arrow button will navigate you back to the home page.

### Technologies

Project is built using following frameworks and libraries:

- angular v12.2.0;
- angular/material v13.0.0;
- rxjs v7.5.0;
- Lodash: v4.17.21;
- Tailwind Css v3.4.5

### Install and run

In order to install all dependencies run `npm install` from the root folder (where `package.json` is stored).
After that run `ng s` OR `ng serve` to start a development server and open `http://localhost:4200/` in browser.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

<!--
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Running unit tests


Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->

This Star Wars project is developed using the Star Wars API (SWAPI), where users can see all characters and filter them by movies, vehicles, starships, and species and In the detailed view, full information about the character is shown.
