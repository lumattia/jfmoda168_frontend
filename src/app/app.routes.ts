import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { StockUpdateComponent } from './pages/stock-update/stock-update.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/new', component: ProductDetailComponent },
  { path: 'stocks', component: StockUpdateComponent },
  { path: 'reports', component: ReportsComponent },
  {path:'**',pathMatch:'full',redirectTo:'products'}
];
