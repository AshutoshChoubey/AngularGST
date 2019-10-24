import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Router,Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
declare var device;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'my-app';
  public currentRoute:any;
   constructor(private router:Router,private location:Location) {
    }
   ngOnInit() {
    this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
        this.currentRoute=(<NavigationEnd>event).url;
    }

});

//Checks the current object and returns true if the object
//is of the specified object type.

}

}
