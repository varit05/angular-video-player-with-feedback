import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fadeInOutAnimation } from 'src/app/animations/fadeInOut.animation';
import { Feedback, FeedbackMessage } from 'src/app/models/feedback.model';
import { VideoSource } from 'src/app/models/video.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  animations: [fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
  @Input() source!: VideoSource;
  volumnControl = new FormControl(0);
  defaultForwardAndBackwardTime = 5;
  isVideoPlaying = true;
  currentProgressBar = 0;
  timelineVisibility: VisibilityState = 'hidden';
  feedbacks!: Array<Feedback>;
  feedbacks$: Observable<Array<Feedback>> =
    this.feedbackService.feedbacks$.pipe(
      tap((feedbacks: Array<Feedback>) => (this.feedbacks = feedbacks.slice()))
    );

  selectedFeedback!: Feedback;

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('timelineWrapper')
  timelineWrapperElement!: ElementRef<HTMLDivElement>;
  @ViewChild('videoPlayer')
  videoPlayerElement!: ElementRef<HTMLDivElement>;

  private get player(): HTMLVideoElement {
    return this.videoElement.nativeElement;
  }

  private get timelineWrapper(): HTMLDivElement {
    return this.timelineWrapperElement.nativeElement;
  }

  private get videoPlayer(): HTMLDivElement {
    return this.videoPlayerElement.nativeElement;
  }

  constructor(private readonly feedbackService: FeedbackService) {}

  ngAfterViewInit(): void {
    // Removing default video tag control and add custom timeline to video tag
    this.player.removeAttribute('controls');
    this.player.volume = 0;
    // Once view is loaded, make custom timeline visible on video
    this.timelineVisibility = 'visible';
    this.videoPlayer.classList.add('on');
    this.videoPlayer.classList.remove('off');
  }

  // play and pause video on click on video viewport and close button as well
  playOrPauseVideo(): void {
    if (this.player.paused) {
      this.isVideoPlaying = true;
      this.player.play();
    } else {
      this.isVideoPlaying = false;
      this.player.pause();
    }
  }

  // Returns current Length of on basis of the video currentTime and total duration of video
  currentProgressBarLength(): number {
    console.log(this.player.volume);
    return (
      this.timelineWrapper.clientWidth *
      (this.player.currentTime / this.player.duration)
    );
  }

  // Update the progress bar on the event
  updateVideoProgressBar(): void {
    this.currentProgressBar = this.currentProgressBarLength();
  }

  // Save the data on the basis of the progress bar
  saveFeedback({ feedbackText }: FeedbackMessage): void {
    this.feedbackService.addFeedback({
      time: this.player.currentTime,
      barLength: this.currentProgressBarLength(),
      feedbackText,
      isCompleted: false,
      replies: [],
    });
    this.playOrPauseVideo();
  }

  // Track each feedback by time which is the unique property in the list of feedbacks
  trackByFeedback(_index: number, feedback: Feedback): number {
    return feedback.time;
  }

  // On click of Timeline, start video from that time
  handleTimelineProgress(timelineEvent: MouseEvent) {
    this.player.currentTime =
      this.player.duration *
      (timelineEvent.offsetX / this.timelineWrapper.clientWidth);
  }

  forwardAndBackwardTime(time: number): void {
    this.player.currentTime += time * this.defaultForwardAndBackwardTime;
  }

  toggleFullScreenVideo() {
    const onOrOff = this.videoPlayer.classList.contains('on');
    if (onOrOff) {
      this.videoPlayer.requestFullscreen();
      this.videoPlayer.classList.remove('on');
      this.videoPlayer.classList.add('off');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.videoPlayer.classList.add('on');
      this.videoPlayer.classList.remove('off');
    }
  }

  // Change the volumn
  handleVolumnChange() {
    this.player.volume = Number(this.volumnControl.value) / 100;
  }

  handleFeedbackClick(feedback: Feedback) {
    this.selectedFeedback = feedback;
  }
}
