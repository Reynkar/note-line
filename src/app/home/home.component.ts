import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { map, shareReplay, groupBy, mergeMap, toArray, reduce } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

interface Note {
  content: string;
  color: string;
  date: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public localstrg: LocalstorageService) { }

  public _notes$: Observable<Note[]>;

  public toggleMonth(element): void {
    if (document.getElementById(element).style.display === "none"){
      document.getElementById(element).style.display = "flex";
      document.getElementById("up " + element).style.display = "none";
      document.getElementById("down " + element).style.display = "inline";
    }
      
    else
    {
      document.getElementById(element).style.display = "none";
      document.getElementById("up " + element).style.display = "inline";
      document.getElementById("down " + element).style.display = "none";
    }
      
  }

  public toggleItem(element): void {
    if (document.getElementById("container " + element).classList.contains("itemHidden")) {
      document.getElementById(element).classList.remove("contentHidden");
      document.getElementById(element).classList.add("contentShow");
      document.getElementById("container " + element).classList.remove("itemHidden");
      document.getElementById("container " + element).classList.add("itemShow");
    }
      
    else {
     document.getElementById(element).classList.add("contentHidden");
     document.getElementById(element).classList.remove("contentShow");
     document.getElementById("container " + element).classList.add("itemHidden");
     document.getElementById("container " + element).classList.remove("itemShow");
    }
      
  }

  ngOnInit(): void {

    this._notes$ = this.localstrg.notes$
    .pipe(
      map(n => n.sort(function(a,b){return b.date.getTime()-a.date.getTime();})),
      map(n => n.reduce((r, a) => {
          r[a.date.getFullYear() + " " + a.date.getMonth()] = r[a.date.getFullYear() + " " + a.date.getMonth()] || [];
          r[a.date.getFullYear() + " " + a.date.getMonth()].push(a);
          return r;
      }, Object.create(null)))
    );
         
  }
}
