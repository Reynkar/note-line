import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { map, shareReplay, groupBy, mergeMap, toArray, reduce } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { KeyValue } from '@angular/common';

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
  public selectedItemDate: Date;

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

  public toggleItem(title, content, date, color): void {
    document.getElementById("selectedItemBG").style.display = "block";

    this.selectedItemDate = date;

    document.getElementById("title").innerText = title;
    document.getElementById("content").innerText = content;
    document.getElementById("date").innerText = date;
    
    let box = document.getElementById("selectedItem");
    
    box.style.display = "block";
    box.style.backgroundColor = color;
    
    let width = box.clientWidth;
    let height = box.clientHeight;

    console.log(width + " " + height);
    box.style.marginLeft = "-" + width/2 + "px";
    box.style.marginTop = "-" + height/2 + "px";
    
  }

  public toggleBG(): void {
    document.getElementById("selectedItemBG").style.display = "none";
    document.getElementById("selectedItem").style.display = "none";
  }

  public removeNote(): void {
    this.toggleBG();
    this.localstrg.removeNote(this.selectedItemDate);
  }

  private keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
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

    console.log(this._notes$);

    this._notes$.forEach(element => {
      console.log(element);
    });
         
  }
}
