import { enableProdMode, NgModuleRef, Type } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { ShellLiteModule } from './shell-lite/shell-lite.module';
import { AppModule } from './app/app.module';

if (environment.production) {
  // avoid error if this Angular version was shared
  try {
    enableProdMode();
  } catch (e) { }
}

bootstrap();

/** Function to bootstrap the microfront and the Shell Lite if necessary */
async function bootstrap(): Promise<void> {
  const params = getURLSearchParams();

  if (params.get('dw-init-mode') === 'shell') {
    await bootstrapModule(ShellLiteModule);
  }

  bootstrapModule(AppModule);
}


/**
 * @private
 */
function bootstrapModule(module: Type<unknown>): Promise<void | NgModuleRef<unknown>> {
  return platformBrowser()
    .bootstrapModule(module)
    .catch((err: any) => console.error(err));
}

/**
 * @private
 */
function getURLSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}
