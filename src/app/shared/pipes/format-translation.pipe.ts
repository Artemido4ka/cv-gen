import { Pipe, PipeTransform } from '@angular/core';

type Props = {
  key: string;
  value: string;
};

@Pipe({
  name: 'formatTranslation',
  standalone: true,
})
export class FormatTranslationPipe implements PipeTransform {
  transform({ key, value }: Props): string {
    return `${value}.errors.${key}`;
  }
}
