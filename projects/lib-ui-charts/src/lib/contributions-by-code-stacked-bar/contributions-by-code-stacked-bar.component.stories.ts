import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';

import { ContributionsByCodeStackedBarComponent } from './contributions-by-code-stacked-bar.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Lib-ui-charts/Contributions By Code',
  component: ContributionsByCodeStackedBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule, 
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [],
    }),
  ], 
} as Meta;

export const Default: Story = () => ({
  props: { },
});

export const Sample1: Story = () => ({
  props: {
    monetaryContributionsByCode: {
      ind: 10000,
      com: 0,
      oth: 6000,
      pty: 4000,
      scc: 2500,
    },
    nonMonetaryContributionsByCode: {
      ind: 4000,
      com: 800,
      oth: 7000,
      pty: 0,
      scc: 550,
    }
  },
});

export const Sample2: Story = () => ({
  props: {
    monetaryContributionsByCode: {
      ind: 7000,
      com: 300,
      oth: 800,
      pty: 200,
      scc: 1500,
    },
    nonMonetaryContributionsByCode: {
      ind: 2000,
      com: 800,
      oth: 50,
      pty: 500,
      scc: 750,
    }
  },
});
