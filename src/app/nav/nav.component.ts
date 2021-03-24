import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type Nav = "home" | "add";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() public selectedMenu: Nav;
  @Output() public selectedMenuChange = new EventEmitter<Nav>();

}
