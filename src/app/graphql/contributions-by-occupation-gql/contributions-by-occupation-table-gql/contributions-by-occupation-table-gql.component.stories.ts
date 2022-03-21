import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { ContributionsByOccupationGQLComponent } from './contributions-by-occupation-table-gql.component';
import { ContributionsByOccupationGQLModule } from '../contributions-by-occupation-gql.module';

export default {
  title: 'Lib-gql/Contributions by Occupation',
  component: ContributionsByOccupationGQLComponent,
  decorators: [
    moduleMetadata({
      declarations: [ ],
      imports: [
        CommonModule,
        ContributionsByOccupationGQLModule,
      ],
      providers: [],
    }),
  ],  
  argTypes: {
  },
} as Meta;


export const Default: Story = () => ({
  props: {  },
})

export const Empty: Story = () => ({
  props: {
    candidateId: ''
  },
})

export const BarbaraBry2020: Story = () => ({
  props: {
    candidateId: 'be0a57fb-c0f0-bbd5-0d42-44a6560cbd21|2020'
  },
})

export const JenniferCampbell2022: Story = () => ({
  props: {
    candidateId: 'd3d1c6e7-0add-49f1-9b3d-e9289e7efcf6|2022'
  },
})

export const MonicaMontgomerySteppe2022: Story = () => ({
  props: {
    candidateId: '82cae978-49df-4a77-8793-0efffb7772b5|2022'
  },
})
