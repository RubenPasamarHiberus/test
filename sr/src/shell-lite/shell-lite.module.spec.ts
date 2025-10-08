import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '@ng-darwin/config';
import { of } from 'rxjs';
import { ShellLiteModule } from './shell-lite.module';

describe('ShellLiteModule', () => {
  let mockConfigService: ConfigService;

  beforeEach(() => {
    mockConfigService = jasmine.createSpyObj('MockConfigService', [
      'onLog$',
      'onError$',
      'onConfigLoaded$',
      'load',
    ]);
    mockConfigService.onLog$ = of({ level: '', msg: '' });
    (mockConfigService as any).onError$ = of(null);
    mockConfigService.onConfigLoaded$ = of({
      gluon: {
        security: {
          storageStrategy: 'sessionStorage',
          client: {
            clientId: 'oidc_client',
          },
          type: 'oidc',
          scope: ['openid'],
          redirectUri: 'http://localhost:4201/?dw-init-mode=shell',
          logoutRedirectUri: 'http://localhost:4201/logout',
          issuerUri: 'http://localhost:8080/',
          tokenEndpoint: '',
        },
      },
    });

    TestBed.configureTestingModule({
      imports: [
        ShellLiteModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    });
  });

  it('initializes', fakeAsync(() => {
    const module = TestBed.inject(ShellLiteModule);
    expect(module).toBeTruthy();
  }));

  it('should create custom element', fakeAsync(() => {
    const module = TestBed.inject(ShellLiteModule);
    spyOn(customElements, 'define');

    module.ngDoBootstrap();
    expect(customElements.define).toHaveBeenCalled();
  }));

  it('should not create a custom element when it is already defined', fakeAsync(() => {
    const module = TestBed.inject(ShellLiteModule);
    spyOn(customElements, 'define');
    spyOn(customElements, 'get').and.returnValue(HTMLElement);

    flush();

    module.ngDoBootstrap();
    expect(customElements.define).not.toHaveBeenCalled();
  }));
});
