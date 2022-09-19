import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  video!: string;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.video = prod.video;
      }
    });
  }

  changeVideo() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'video',
        value: this.video,
      })
    );
  }
}
