export interface FeedbackMessage {
  feedbackText: string;
  isCompleted: boolean;
}

export interface Reply {
  text: string;
  time: Date;
}
export interface Feedback extends FeedbackMessage {
  time: number;
  barLength: number;
  replies: Reply[];
}
