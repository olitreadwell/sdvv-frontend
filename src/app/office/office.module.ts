import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './components/office/office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { CandidateModule } from '../candidate/candidate.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { CandidateCardListRoutedModule } from '../routed/candidate-card-list-routed/candidate-card-list-routed.module';


@NgModule({
  declarations: [
    OfficeComponent,
    OfficeDistrictComponent,
    QuickViewContainerComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    CandidateModule,
    OfficeRoutingModule,
    CandidateCardListRoutedModule,
  ],
  exports: [
    OfficeComponent,
  ]
})
export class OfficeModule { }
