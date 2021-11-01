import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackMessage } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent {
  // Build Form with the feedback form control
  feedbackForm = new FormGroup({
    feedbackText: new FormControl('', [Validators.required]),
  });

  @Output() formSubmit: EventEmitter<FeedbackMessage> = new EventEmitter();
  @Output() formExit: EventEmitter<null> = new EventEmitter();

  closeFrom() {
    this.formExit.emit();
    this.feedbackForm.reset();
  }

  saveFeedback(): void {
    if (this.feedbackForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.feedbackForm.value);
    this.feedbackForm.reset();
  }
}
