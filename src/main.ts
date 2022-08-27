import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GraphQLModule } from './app/graphql/graphql.module';
import { MAIN_ROUTES } from './app/routes/main-routes';
import { AppComponent } from './app/components/app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const gtmID = environment.gtm;

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(
        MAIN_ROUTES,
        // { relativeLinkResolution: 'legacy' },
      ),
      BrowserAnimationsModule,
      GraphQLModule,
      // NgxEchartsModule.forRoot({
      //   echarts: () => import('echarts')
      // }),

      // NgxMapboxGLModule.withConfig({
      //   accessToken: 'pk.eyJ1Ijoicm9iZXJ0Z3oiLCJhIjoiY2t2cTNscG5vMXVyNTJwdXBlNnFtbTlqYSJ9.mKxW2etLLUmXBEnBPax0Dw',
      //   // Optional, can also be set per map (accessToken input of mgl-map)
      // }),
    ),
    { provide: 'googleTagManagerId', useValue: gtmID },
    Title,
  ]
}).catch(err => console.error(err));
