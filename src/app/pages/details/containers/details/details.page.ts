import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/shared/state/app.reducer';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';
import { Units } from 'src/app/shared/models/units.enum';
import * as fromDetailsActions from '../../state/details.actions';
import * as fromDetailsSelectors from '../../state/details.selectors';
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors';
import { ComponentPortal, DomPortalOutlet, PortalOutlet } from '@angular/cdk/portal';
import { AppComponent } from 'src/app/app.component';
import { UnitSelectorComponent } from 'src/app/pages/home/containers/unit-selector/unit-selector.component';

@Component({
  selector: 'jv-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit,OnDestroy {

  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  unit$: Observable<Units>;

  private portalOutlet: PortalOutlet;

  constructor(private store: Store<AppState>,private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef, private injector: Injector, private appComponent: AppComponent) {
  }

  ngOnDestroy(): void {
    this.portalOutlet.detach();
  }

  ngOnInit() {
    this.appComponent.act = false;
    this.appComponent.act2 = false;
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());

    this.details$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsEntity));
    this.loading$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsLoading));
    this.error$ = this.store.pipe(select(fromDetailsSelectors.selectDetailsError));

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));

    this.setupPortal();
  }

  private setupPortal() {
    const el = document.querySelector('#navbar-portal-outlet');
    this.portalOutlet = new DomPortalOutlet(
      el,
      this.componentFactoryResolver,
      this.appRef,
      this.injector,
    );
    this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));   
  }
}
