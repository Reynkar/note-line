import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from "../services/localstorage.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public localstrg: LocalstorageService) { }

  ngOnInit(): void {
  }

  public sendNote(content: string): void{
    var r = Math.floor(Math.random() * 51) + 204;
    var g = Math.floor(Math.random() * 51) + 204;
    var b = Math.floor(Math.random() * 51) + 204;
    var color = "rgb("+r+", "+g+", "+b+")";
    console.log("rgb("+r+", "+g+", "+b+")");
    this.localstrg.addNote(content, color);
  }

}
