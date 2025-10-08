import { NgModule, DoBootstrap, Injector, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { Observable, firstValueFrom } from 'rxjs';
import { OAuthGuard, SecurityContextManagerModule } from '@santander/security-angular';
import { CustomEventListenerModule } from '@santander/http-angular';
import { AppProps, ConfigModule, ConfigService } from '@ng-darwin/config';
import { ShellLiteComponent } from './shell-lite.component';

/**
 * Acquire the security config from the ConfigService.
 * @param configService Darwin ConfigService
 * @returns The security configuration
 */
async function acquireSecurityConfig(configService: ConfigService): Promise<any> {
  const cfg = await firstValueFrom(configService.onConfigLoaded$ as Observable<AppProps>);
  const gluonSecurityProps = cfg.gluon!.security!;
  return Promise.resolve(gluonSecurityProps);
}

/**
 * ShellLiteModule
 */
@NgModule({
  declarations: [
    ShellLiteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ShellLiteComponent,
        canActivate: [ OAuthGuard ]
      }
    ], { initialNavigation: 'enabledBlocking' }),
    ConfigModule.forRoot({
      technicalGrouping: 'san-valfnt-investopesl',
      logEvent: {
        level: 1,
        handler(log): void { console.log('shell-lite.module.ts: Log event from Config module', log); } // eslint-disable-line no-console
      },
      errorEvent: {
        handler(err): void { console.log('shell-lite.module.ts: Error event from Config module', err); } // eslint-disable-line no-console
      },
      configLoadedEvent: {
        handler(config): void { console.log('shell-lite.module.ts: ConfigLoadedEvent from Config module', config); } // eslint-disable-line no-console
      }
    }),
    SecurityContextManagerModule.forRoot({
      useFactory: acquireSecurityConfig,
      deps: [ConfigService]
    }),
    CustomEventListenerModule.forRoot()
  ]
})
export class ShellLiteModule implements DoBootstrap {

  private _injector = inject(Injector);

  /**
   * Hook for manual ngDoBootstrap
   * It will create the Angular Element (a native Web Component)
   */
  ngDoBootstrap(): void {
    const ce = createCustomElement(ShellLiteComponent, { injector: this._injector });
    // IMPORTANT: this name must be unique per microfront
    const tagName = 'san-valfnt-investopesl';

    if (!customElements.get(tagName)) {
      customElements.define(tagName, ce);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `${tagName} component is already define. This should not happen, the component should be defined only one time.`
      );
    }
  }
}

