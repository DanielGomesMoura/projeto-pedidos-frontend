import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthInterceptorProvider } from './app/interceptors/auth.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './app/util/CustomMatPaginatorIntl';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';

// Registrando o locale 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatSelectModule, MatTableModule, MatRadioModule, MatInputModule, MatDatepickerModule, MatIconModule, MatListModule, MatCardModule, MatDialogModule, MatSortModule, ToastrModule.forRoot({
            timeOut: 4000,
            closeButton: true,
            progressBar: true
        }), NgxMaskModule.forRoot()),
        provideRouter(APP_ROUTES),
        CurrencyPipe,
        DatePipe,
        AuthInterceptorProvider,
        provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
