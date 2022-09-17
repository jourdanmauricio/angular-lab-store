import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '@core/_animations';
import { Store } from '@ngxs/store';
import { ApplicationState } from 'app/store/application/application.state';
import { delay } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class LayoutComponent implements OnInit {
  isExpanded: boolean = true;
  showMenu: boolean = true;
  side: 'push' | 'over' | 'side' = 'side';
  isLoading$: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    //Total hack
    window.onresize = (e) => {
      this.checkMenu();
    };
    this.checkMenu();

    setTimeout(() => {
      this.store.select(ApplicationState.isLoading).subscribe((loading) => {
        this.isLoading$ = loading;
      });
    });
  }

  onToggleMenu() {
    this.showMenu = !this.showMenu;
  }

  checkMenu() {
    var w = window.innerWidth;
    if (w > 768) {
      this.showMenu = true;
      this.side = 'side';
    } else {
      this.showMenu = false;
      this.side = 'over';
    }
  }
}
