import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDrawerContainer, MatDrawer } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemIcon } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: true,
    imports: [MatDrawerContainer, MatDrawer, MatNavList, MatListItem, RouterLink, MatIcon, MatListItemIcon, MatIconButton, HeaderComponent, RouterOutlet]
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }

  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout',{timeOut: 5000})
  }
}
