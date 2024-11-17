import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticate: boolean = false;
  userFullName:string = '';

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth:OktaAuth) {

    }
  

  ngOnInit(): void {

    //subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticate = result.isAuthenticated!;
        this.getUserDetails();
      }

    );

  }

  getUserDetails() {
    if(this.isAuthenticate) {

      //fetch the logged in user details (user's claims)
      //
      //user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
          
          // retrieve the user's email from authentication response
          const theEmail = res.email;

          //now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      );
    }
  }

  logout() {
    //terminates the session with okta and removes current tokens
    this.oktaAuth.signOut();
  }

}
