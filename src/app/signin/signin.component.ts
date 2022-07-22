import { Component, OnInit } from '@angular/core';
import { OwlCarousel } from '../../assets/dist/js/login-data';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  EmailId: string = '';
  Password: string = '';
  showpassword: string = 'password';

  constructor(private auth: AuthService, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    OwlCarousel('login_owl_carousel');
  }

  login() {
    this.auth
      .logIn({ EmailId: this.EmailId, Password: this.Password })
      .subscribe((data: any) => {
        console.log(data);
        const token_parsed = this.jwtHelper.decodeToken(
          data.token.Value.token.Value
        );
        localStorage.setItem('ctoken', data.token.Value.token.Value);
        localStorage.setItem(
          'company',
          JSON.stringify({ ...token_parsed, CompanyId: data.company.Id })
        );
        if (data['status'] == 200) {
          this.auth.loggedIn.next(true);
          this.auth.companyid.next(data.company.Id)
        }
      });
  }

  togglepasswordvisibility() {
    this.showpassword = this.showpassword == 'password' ? 'text' : 'password';
  }
}
