import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { TimePipe } from './pipes/time.pipe';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    FeedbackFormComponent,
    FeedbackListComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
