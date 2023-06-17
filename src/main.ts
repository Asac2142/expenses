import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { reducers } from '@store/index';
import { TransactionEffects } from '@store/transaction/transaction.effects';
import { SettingEffects } from '@store/settings/settings.effects';
import { ImgSanatizerPipe } from './app/common/pipes/img-sanatizer.pipe';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgxMaskPipe,
    ImgSanatizerPipe,
    provideEnvironmentNgxMask(),
    importProvidersFrom(
      IonicModule.forRoot({}),
      StoreModule.forRoot(reducers),
      StoreDevtoolsModule.instrument(),
      EffectsModule.forRoot([TransactionEffects, SettingEffects]),
      IonicStorageModule.forRoot(),
      HttpClientModule
    ),
    provideRouter(routes)
  ]
});
