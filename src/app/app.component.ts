import { Component, OnInit } from '@angular/core';
import { Nav } from "./nav/nav.component";
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'note-line';

  public menu: Nav = "home";

  constructor(private localstrg: LocalstorageService) {}

  public ngOnInit(): void{
      this.localstrg.init();
      this.localstrg.updatingNotes();
  }
}
