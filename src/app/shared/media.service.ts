import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaSize } from './media-size';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private mediaObserver: MediaObserver) {}

  getMediaSize(): Observable<MediaSize> {
    return this.mediaObserver.media$.pipe(
      map((change: MediaChange) => {
        return new MediaSize(change.mqAlias);
      })
    );
  }
}
