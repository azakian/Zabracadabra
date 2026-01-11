// image.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private readonly bucket = 'Images';
  getPublicUrl(): string {
    const path = 'grille.jpg';
    return `${environment.supabase.url}/storage/v1/object/public/${this.bucket}/${path}`;
  }
}
