import { Component } from '@angular/core';

import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signedIn: boolean;
  user: any;
  greeting: string;
  usernameAttributes = "email";

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
          this.greeting = "Hello " + this.user.username;
        }
      })
  }

  signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        displayOrder: 2,
        type: 'password'
      },
      {
        label: 'Phone Number',
        key: 'phone_number',
        required: true,
        displayOrder: 3,
        type: 'string'
      },
      {
        label: 'Custom Attribute',
        key: 'custom_attr',
        required: false,
        displayOrder: 4,
        type: 'string',
      }
    ]
  }

  onAlbumImageSelected(event) {
    window.open(event, '_blank');
  }

}
