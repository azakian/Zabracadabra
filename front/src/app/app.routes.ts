import { Routes } from '@angular/router';
import { desktopOnlyGuard } from './shared/guards/desktop-only.guard';

export const routes: Routes = [
  {
    path: 'desktop-required',
    loadComponent: () =>
      import('./shared/ui/desktop-required/desktop-required').then((m) => m.DesktopRequired),
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./domains/browse-board-games/features/basket/basket').then((m) => m.Basket),
    canActivate: [desktopOnlyGuard],
  },
  {
    path: 'code-of-conduct',
    loadComponent: () =>
      import('./domains/browse-board-games/features/code-of-conduct/code-of-conduct').then(
        (m) => m.CodeOfConduct,
      ),
    canActivate: [desktopOnlyGuard],
  },
  {
    path: 'check-answers',
    loadComponent: () =>
      import('./domains/browse-board-games/features/check-answers/check-answers').then(
        (m) => m.CheckAnswers,
      ),
    canActivate: [desktopOnlyGuard],
  },
  {
    path: 'games/:id',
    loadComponent: () =>
      import('./domains/browse-board-games/features/board-game-detail/board-game-detail').then(
        (m) => m.BoardGameDetail,
      ),
    canActivate: [desktopOnlyGuard],
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./domains/browse-board-games/features/board-games-list/browse-board-game.page').then(
        (m) => m.BrowseBoardGamePage,
      ),
    canActivate: [desktopOnlyGuard],
  },
  {
    path: '**',
    redirectTo: 'games',
  },
];
