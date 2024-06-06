import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.checkLogin();
  }

  async checkLogin() {
    const isLoggedIn =  this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    } else {
      await this.keycloakService.login();
    }
  }

  logout() {
    this.keycloakService.logout();
  }
}
