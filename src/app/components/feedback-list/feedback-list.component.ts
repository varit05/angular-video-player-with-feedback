import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackListComponent {
  @Input() feedbacks!: Array<Feedback>;
  @Input() selectedFeedback!: Feedback;

  reply = new FormControl('', [Validators.required]);

  constructor(private readonly feedbackService: FeedbackService) {}

  // Track each feedback by time which is the unique property in the list of feedbacks
  trackByFeedback(_index: number, feedback: Feedback): number {
    return feedback.time;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes?.feedbacks?.currentValue) {
      this.feedbacks = changes.feedbacks.currentValue
    }

    if(changes?.selectedFeedback?.currentValue) {
      this.selectedFeedback = changes.selectedFeedback.currentValue
    }
  }

  sendReply(feedback: Feedback): void {
    console.log('this.feedback', this.reply)
    if(!this.reply.valid) {
      return;
    }
    this.feedbackService.sendReply(feedback, this.reply.value);
    this.reply.setValue('');
  }

  markResolved(feedback: Feedback): void {
    this.feedbackService.markFeedbackResolved(feedback);
  }
}
