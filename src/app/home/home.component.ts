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

  public toggle(element): void {
    if (document.getElementById(element).style.display === "none")
      document.getElementById(element).style.display = "flex";
    else
      document.getElementById(element).style.display = "none";
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
