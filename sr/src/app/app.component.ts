import { Component, OnDestroy, OnInit, VERSION, ViewEncapsulation } from '@angular/core';
import { MicrofrontDirective } from '@ng-darwin-wmf/microfront';

/**
 * AppComponent
 */
@Component({
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['app.component.scss']
})
export class AppComponent extends MicrofrontDirective implements OnInit, OnDestroy {

  /** Angular version */
  ngVersion = VERSION.major;

  /** Binding example */
  greeting = '';

  /**
   * ngOnInit lifecycle hook
   */
  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
  }

  /**
   * ngOnDestroy lifecycle hook
   */
  override ngOnDestroy(): void {
    super.ngOnDestroy();

    // this event is mandatory to give feedback on the destruction of the microfront
    this.destroy.emit();
  }

  /**
   * Greet method
   */
  greet(): void {
    this.greeting = $localize`Hello, Gluon!`;
  }
}
