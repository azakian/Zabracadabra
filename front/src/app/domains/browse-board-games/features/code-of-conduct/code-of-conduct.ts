import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeOfConductStore } from './code-of-conduct.store';

@Component({
  selector: 'app-code-of-conduct',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './code-of-conduct.html',
  styleUrl: './code-of-conduct.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CodeOfConductStore],
})
export class CodeOfConduct {
  readonly store = inject(CodeOfConductStore);
  showPassword = signal(false);
}
