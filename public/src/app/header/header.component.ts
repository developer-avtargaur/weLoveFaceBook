import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }
  
  ngOnInit() {
  }

  setUserProfile(e) {
    this.router.navigate(['/userprofile']);
  }

  logoutUser(e) {
    e.preventDefault();
    // console.log(e);

    this.user.setUserLoggedOut();
    // console.log('user logged in? ', this.user.getUserLoggedIn());
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);

  }

}
