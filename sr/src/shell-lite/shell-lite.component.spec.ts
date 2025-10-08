import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigTestingModule } from '@ng-darwin/config';
import { CustomEventListenerModule } from '@santander/http-angular';
import { ShellLiteComponent } from './shell-lite.component';

describe('ShellLiteComponent Tests', () => {
  let fixture: ComponentFixture<ShellLiteComponent>;
  let component: ShellLiteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CustomEventListenerModule.forRoot(),
        ConfigTestingModule.forRoot({
          appKey: 'appKey_mock',
          technicalGrouping: 'gln-keymock-appnamemocksl',
          appName: 'appName_mock',
          app: {}
        })
      ],
      declarations: [
        ShellLiteComponent
      ]
    });

    fixture = TestBed.createComponent(ShellLiteComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
