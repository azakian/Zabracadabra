import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PageMeta } from '../../../../../../shared/pagination/models/page';

@Component({
  selector: 'app-pager',
  imports: [],
  templateUrl: './pager.html',
  styleUrl: './pager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pager {
  readonly pager = input.required<PageMeta>();

  readonly previousPage = output<void>();
  readonly nextPage = output<void>();
}
