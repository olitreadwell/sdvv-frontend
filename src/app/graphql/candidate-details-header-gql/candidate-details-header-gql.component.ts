import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

import { CandidateFinanceDataGQL, CandidateFinanceDataResponse } from './candidate-finance-data-gql.query';
import { CandidateInfoGQL, CandidateInfoResponse } from './candidate-info-gql.query';

@Component({
  selector: 'gql-candidate-details-header',
  template: `
    <candidate-details-header
      [candidateName]="candidateName"
      [description]="description"
      [website]="website"
      [raised]="raisedAmount"
      [donors]="donorsCount"
      [averageDonation]="averageDonationAmount"
    ></candidate-details-header>
  `,
})
export class CandidateDetailsHeaderGQLComponent implements OnChanges {
  @Input() candidateId;

  imageUrl: string;
  candidateName: string;
  description: string;
  website: string;

  public raisedAmount;
  public donorsCount;
  public averageDonationAmount;

  constructor(
    private candidateInfoGQL: CandidateInfoGQL,
    private candidateFinanceDataGQL: CandidateFinanceDataGQL,
    private titleService: Title,
   ) { }

   ngOnChanges(changes: SimpleChanges): void  {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;
    
    if (!this.candidateId) { return; }

    this.candidateInfoGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateInfoResponse = result.data;
      const candidateInfo = response?.candidate;

      this.imageUrl = candidateInfo?.imageUrl ? candidateInfo.imageUrl : null;
      this.candidateName = candidateInfo?.fullName ? candidateInfo.fullName : null
      this.description = candidateInfo?.description ? candidateInfo.description : null;
      this.website = candidateInfo?.website ? candidateInfo.website : null;

      this.setTitle(candidateInfo);
    });

    this.candidateFinanceDataGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateFinanceDataResponse = result.data;
      const raised = response?.candidate?.committee?.contributions?.sum;
      const donors = response?.candidate?.committee?.contributions?.count;
      const average = response?.candidate?.committee?.contributions?.average;

      this.raisedAmount = raised ? raised : 0;
      this.donorsCount = donors ? donors : 0;
      this.averageDonationAmount = average ? average : 0;
    });
  }

  setTitle(candidateInfo) {
    if (!candidateInfo) { return; }

    const year = candidateInfo.electionYear;
    const office = candidateInfo.office;
    const district = candidateInfo.district ? `District ${candidateInfo.district}` : ``;

    const candidateName = candidateInfo.fullName;
    const pageTitle = `${candidateName}, Details, ${office} ${district}, Candidate ${year} | ${globals.pageTitleSuffix}`;

    this.titleService.setTitle(pageTitle);
  }
}