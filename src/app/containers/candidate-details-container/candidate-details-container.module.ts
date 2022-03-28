import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateDetailsHeaderGQLModule } from 'src/app/graphql/candidate-details-header-gql/candidate-details-header-gql.module';
import { CandidateDetailsModule } from 'src/app/candidate-details/candidate-details.module';
import { DetailsRaisedSpentModule } from 'src/app/details-raised-spent/details-raised-spent.module';
import { CandidateDetailsContainerComponent } from './candidate-details-container.component';

@NgModule({
  declarations: [
    CandidateDetailsContainerComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatTabsModule,
    FontAwesomeModule,
    RouterModule,

    CandidateDetailsHeaderGQLModule,
    CandidateDetailsModule,
    DetailsRaisedSpentModule,
  ],
  exports: [
    CandidateDetailsContainerComponent,
  ],
})
export class CandidateDetailsContainerModule { }