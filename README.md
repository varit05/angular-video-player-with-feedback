# AngularVideoPlayerFeedback

This project is having:

- `VideoPlayerComponent`: Built with custom timeline.
  - Takes `source` as input with type `VideoSource` and autoplay the video.
  - On click of Video, feeback form appears along with `Save` and `close` button.
  - On click of Save, feeback is saved and display it below the video and video resumes automatically.
  - On click of cancel, close the feedback box and video resumes automatically.
  - On click of timeline, it plays the video from that time.

- `FeedbackFormComponent`: handles the feedback from with close and submit event.
  - User clicks save, Validate the form and if valid, Emits `formSubmit` event.
  - User clicks enter, it fire `formSubmit` event.
  - User clicks close icon, Emits `formExit`.

- `FeedbackListComponent`: List all the feedback logged during the video.
  - Takes all `feedbacks` and show it on the User Interface.

- `TimePipe`: Transforms duration on `VideoPlayerComponent` to `hh:mm:ss` format.

- `Feedback`: Model for feedback.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
