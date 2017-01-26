# Generic Frontend

This is an Angular 2 project, generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

It is a generic frontend application that could be used as a starting point for other projects, providing the following features:

- User login with email/password as well as with existing account in some other provider (Google, Facebook, Twitter, etc.), using oAuth.
- Integration with payment gateways in order to provide premium services 
- Real time updates with socket.io
- An example premium service

It works together with [generic-backend](https://github.com/fjrd84/generic-backend).

The first premium service will be using the main view of this app as a full screen ad poster, where you can pay for displaying the picture you wish, typically an advertisement. 

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
