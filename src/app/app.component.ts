import { Component, OnInit } from '@angular/core';
import { Nav } from "./nav/nav.component";
import { LocalstorageService } from './services/localstorage.service';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'note-line';

  public menu: Nav = "home";

  status = 'ONLINE';
  isConnected = true;

  constructor(private localstrg: LocalstorageService, private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        console.log("ONLINE!");
      }
      else {
        this.status = "OFFLINE";
        console.log("OFFLINE!");
      }
    })
  }

  public ngOnInit(): void{
      this.localstrg.init();
      this.localstrg.updatingNotes();
      //this.localstrg.addInit();
  }
}
