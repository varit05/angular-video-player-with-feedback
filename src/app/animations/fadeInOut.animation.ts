import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => *', [
    style({ opacity: 0, transform: 'translateY(100%)' }),
    animate(200),
  ]),
  transition('* => void', [
    animate(200, style({ opacity: 0, transform: 'translateY(100%)' })),
  ]),
]);
