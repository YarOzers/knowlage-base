import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {HomeComponent} from "./components/home/home.component";

class AppAuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected override keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        await this.keycloakAngular.login();
        return;
      }
      resolve(true);
    });
  }
}

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AppAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
