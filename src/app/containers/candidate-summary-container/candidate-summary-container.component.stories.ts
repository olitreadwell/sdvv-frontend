import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CandidateSummaryContainerModule } from './candidate-summary-container.module';
import { CandidateSummaryContainerComponent } from './candidate-summary-container.component';

export default {
  title: 'Lib Containers/Candidate Summary',
  component: CandidateSummaryContainerComponent,
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        CandidateSummaryContainerModule,
      ],
      providers: [
      ],
    }),
  ],
} as Meta;

export const Default: Story = () => ({
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
