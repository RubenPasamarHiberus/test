import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MicrofrontDirective, MicrofrontModule } from '@ng-darwin-wmf/microfront';
import { ConfigTestingModule } from '@ng-darwin/config';
import { FlameStencilAngularModule } from '@santander/flame-ui-angular';
import { RequestToEventConverterModule } from '@santander/http-angular';
import { AppComponent } from './app.component';

describe('AppComponent Tests', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        RequestToEventConverterModule.forRoot(),
        RouterTestingModule,
        MicrofrontModule,
        FlameStencilAngularModule,
        ConfigTestingModule.forRoot({
          appKey: 'appKey_mock',
          technicalGrouping: 'gln-keyMock-appnamemock',
          appName: 'appName_mock',
          app: {}
        })
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spyOn(MicrofrontDirective.prototype, 'ngOnDestroy');
  });

  it('should create the component', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should destroy the component correctly', () => {
    spyOn(component.destroy, 'emit');
    fixture.detectChanges();
    component.ngOnDestroy();

    expect(MicrofrontDirective.prototype.ngOnDestroy).toHaveBeenCalledTimes(1);
    expect(component.destroy.emit).toHaveBeenCalledTimes(1);
  });

  it('should greet when the method is called', () => {
    fixture.detectChanges();

    expect(component.greeting).toBe('');

    component.greet();

    expect(component.greeting).toBe('Hello, Gluon!');
  });
});
