import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(time: number): string {
    let playerTime = '';
    if (!time) {
      return playerTime;
    }
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      playerTime += `${hours}:${minutes < 10 ? '0' : ''}`;
    }

    playerTime += `${minutes}:${seconds < 10 ? '0' : ''}`;
    playerTime += seconds;
    return playerTime;
  }
}
