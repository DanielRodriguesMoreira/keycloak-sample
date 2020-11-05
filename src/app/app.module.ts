import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';

export function initKeyCloak(keyCloak: KeycloakService): () => Promise<boolean> {
  return (): Promise<boolean> => keyCloak.init({
    config: {
      url: 'http://10.113.147.32/auth',
      clientId: 'resellerm.selfmng',
      realm: 'resellerm.selfmng.alticelabs'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false,
      enableLogging: true
    }
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initKeyCloak,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
