import { Component, OnInit } from '@angular/core';
import { PRODUCT_LISTING } from '@core/constants/constants';
import { ProdListingType } from '@core/constants/enums';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  availableListing = PRODUCT_LISTING;
  listingType: ProdListingType = ProdListingType.GOLD_PRO;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.listingType = prod.listing_type_id;
      }
    });
  }

  changeListingType() {
    console.log('this.listingType', this.listingType);
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'listing_type_id',
        value: this.listingType,
      })
    );
  }
}
