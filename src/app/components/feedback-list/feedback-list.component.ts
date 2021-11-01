import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackListComponent {
  @Input() feedbacks!: Array<Feedback>;

  // Track each feedback by time which is the unique property in the list of feedbacks
  trackByFeedback(_index: number, feedback: Feedback): number {
    return feedback.time;
  }
}
