import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OfficeCardGQLModule } from 'src/app/graphql/office-card-gql/office-card-gql.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    OfficeCardGQLModule,
  ],
  selector: 'office-card-list-routed',
  template: `
    <div class="list" *ngFor="let title of officeTitles">
      <office-card-gql
        [year]="year"
        [officeTitle]="title"
      ></office-card-gql>
    </div>
  `,
  styleUrls: ['./office-card-list-routed.component.scss']
})
export class OfficeCardListRoutedComponent implements OnInit {
  year: string;
  officeTitles = [ 'Mayor', 'City Council', 'City Attorney' ];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { 
    this.activatedRoute.paramMap.subscribe(params => {
      this.year = params.get('year');
    })
  }
}
