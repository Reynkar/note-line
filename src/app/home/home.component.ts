import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public localstrg: LocalstorageService) { }

  ngOnInit(): void {
    
  }
  /*
  public notes: { title: string, date: string }[] = [
    {"title": "Do the math homework fgsfgfdgdfgdfgdfgdfgdfgdfdf", "date": "2021 03 12"},
    {"title": "Do the cleaning", "date": "2021 03 12"},
    {"title": "Drive the kids to school", "date": "2021 03 12"},
    {"title": "Prepare for the exam", "date": "2021 03 12"},
    {"title": "Get up early", "date": "2021 03 12"},
    {"title": "Get up early", "date": "2021 03 12"},
    {"title": "Get up early", "date": "2021 03 12"},
    {"title": "Get up early", "date": "2021 03 12"},
    {"title": "Get up early", "date": "2021 03 12"},
    {"title": "Get up early", "date": "2021 03 12"},
  ];
  */
  

}
