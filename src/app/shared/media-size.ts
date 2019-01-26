import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaSize {
  public static readonly XS = 'xs';
  public static readonly SM = 'sm';
  public static readonly MD = 'md';
  public static readonly LG = 'lg';
  constructor(public current: string) {}
}
