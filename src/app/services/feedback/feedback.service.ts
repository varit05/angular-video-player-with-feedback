import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private _feedbacks: Array<Feedback> = [];
  private feedbacks = new BehaviorSubject<Array<Feedback>>(this._feedbacks);

  feedbacks$ = this.feedbacks.asObservable();

  addFeedback(feedback: Feedback) {
    this._feedbacks.push(feedback);
    this.feedbacks.next(this._feedbacks);
  }

  sendReply(markingFeedback: Feedback, text: string) {
    const feedbacks = this._feedbacks.map((feedback: Feedback) => {
      if (feedback.time === markingFeedback.time) {
        feedback.replies.push({
          text,
          time: new Date(),
        });
      }
      return feedback;
    });
    this.feedbacks.next(feedbacks);
  }

  markFeedbackResolved(markingFeedback: Feedback) {
    const feedbacks = this._feedbacks.filter((feedback: Feedback) => {
      if (feedback.time === markingFeedback.time) {
        feedback.isCompleted = true;
      }
      return feedback;
    });
    this.feedbacks.next(feedbacks);
  }
}
