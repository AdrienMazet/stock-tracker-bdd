import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrow',
})
export class ArrowPipe implements PipeTransform {
  transform(change: number): string {
    return change > 0
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/1200px-Green_Arrow_Up.svg.png'
      : 'https://upload.wikimedia.org/wikipedia/commons/0/04/Red_Arrow_Down.svg';
  }
}
