import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { AnswerResult } from './answer';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private readonly http = inject(HttpClient);
  private readonly localStorage = inject(LocalStorageService);
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    apikey: environment.supabase.anonKey,
    Authorization: `Bearer ${environment.supabase.anonKey}`,
  });

  public checkAnswer(code: string, userAnswer: string): Observable<AnswerResult> {
    const username = this.localStorage.getUsername() ?? 'Unknown guest';

    return this.http.post<AnswerResult>(
      `${environment.supabase.url}/rest/v1/rpc/check_answer`,
      { p_code: code, p_user_answer: userAnswer, p_username: username },
      { headers: this.headers },
    );
  }
}
