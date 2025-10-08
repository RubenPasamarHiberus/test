import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '@ng-darwin/config';
import { of } from 'rxjs';
import { AppModule } from './app.module';

describe('AppModule', () => {
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
    mockConfigService.onConfigLoaded$ = of({});

    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(AppModule);

    expect(module).toBeTruthy();
  });

  it('should create custom element', () => {
    const module = TestBed.inject(AppModule);
    spyOn(customElements, 'define');
    module.ngDoBootstrap();

    expect(customElements.define).toHaveBeenCalled();
  });

  it('should not create a custom element when it is already defined', () => {
    const module = TestBed.inject(AppModule);
    spyOn(customElements, 'define');
    spyOn(customElements, 'get').and.returnValue(HTMLElement);
    module.ngDoBootstrap();

    expect(customElements.define).not.toHaveBeenCalled();
  });
});
