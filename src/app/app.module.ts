import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { HomeComponent } from './components/home/home.component';
import {AppAuthGuard} from "./app-auth.guard";

function initializeKeycloak(keycloak: KeycloakService) {
  return async () => {
    try {
      await keycloak.init({
        config: {
          url: 'http://188.235.130.37:8282',
          realm: 'knowlage-base',
          clientId: 'kb-client',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
      });
    } catch (error) {
      // Обработка ошибки
      console.error('Keycloak initialization failed', error);
    }
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    AppAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
