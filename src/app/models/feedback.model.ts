export interface FeedbackMessage {
  feedbackText: string;
}

export interface Feedback extends FeedbackMessage {
  time: number;
  barLength: number;
}
