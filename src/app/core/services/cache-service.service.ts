import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  public setObjectCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getObjectCache(key: string): any {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  public isExistCache(key: string): boolean {
    return localStorage.getItem(key) ? true : false;
  }
}
