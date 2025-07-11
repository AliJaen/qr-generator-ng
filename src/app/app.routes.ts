import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyQRCodesComponent } from './pages/my-qrcodes/my-qrcodes.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'qr-codes', component: MyQRCodesComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', component: HomeComponent },
];
