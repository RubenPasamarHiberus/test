import { LocationStrategy, PlatformLocation } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule, inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { MicrofrontModule, locationStrategyFactory } from '@ng-darwin-wmf/microfront';
import { ConfigModule } from '@ng-darwin/config';
import { FlameStencilAngularModule } from '@santander/flame-ui-angular';
import { RequestToEventConverterModule } from '@santander/http-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * AppModule
 */
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    ConfigModule.forRoot({
      technicalGrouping: 'san-valfnt-investope',
      logEvent: {
        level: 1,
        handler(log): void { console.log('app.module.ts: Log event from Config module', log); } // eslint-disable-line no-console
      },
      errorEvent: {
        handler(err): void { console.log('app.module.ts: Error event from Config module', err); } // eslint-disable-line no-console
      },
      configLoadedEvent: {
        handler(config): void { console.log('app.module.ts: ConfigLoadedEvent from Config module', config); } // eslint-disable-line no-console
      }
    }),
    MicrofrontModule,
    HttpClientModule,
    RequestToEventConverterModule.forRoot(),
    FlameStencilAngularModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useFactory: locationStrategyFactory, deps: [PlatformLocation] }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {

  private readonly _injector = inject(Injector);

  /**
   * Hook for manual ngDoBootstrap
   * It will create the Angular Element (a native Web Component)
   */
  ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this._injector });
    // IMPORTANT: this name must be unique per microfront
    const tagName = 'san-valfnt-investope';

    if(!customElements.get(tagName)) {
      customElements.define(tagName, ce);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `${tagName} component is already define. This should not happen, the component should be defined only one time.`
      );
    }
  }
}
