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
  video_id!: string;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.video_id = prod.video_id;
      }
    });
  }

  changeVideo() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'video_id',
        value: this.video_id,
      })
    );
  }
}
