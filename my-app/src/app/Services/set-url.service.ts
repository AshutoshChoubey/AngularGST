import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetUrlService {

  constructor() { }
  public url="http://localhost/bcm/backend/public/api"
}
