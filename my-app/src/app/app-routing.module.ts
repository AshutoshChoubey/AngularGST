import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './Products/product/product.component';
import { PurchaseComponent } from './Purchases/purchase/purchase.component';
import { BeforeloginService } from './Services/beforelogin.service';
import { AfterloginService } from './Services/afterlogin.service';
import { DepartmentComponent } from './Departments/department/department.component';
import { DepartmentListComponent } from './Departments/department-list/department-list.component';
import { SupplierAddComponent } from './Suppliers/supplier-add/supplier-add.component';
import { SupplierSearchComponent } from './Suppliers/supplier-search/supplier-search.component';
import { ProductSearchComponent } from './Products/product-search/product-search.component';
import { SearchPurchaseComponent } from './Purchases/search-purchase/search-purchase.component';
import { ReturnPurchaseComponent } from './Purchases/return-purchase/return-purchase.component';
import { PurchaseInvoiceComponent } from './Purchases/purchase-invoice/purchase-invoice.component';
import { IndentComponent } from './Indent/indent/indent.component';
import { IndentListComponent } from './Indent/indent-list/indent-list.component';
import { RequisitionComponent } from './Requisition/requisition/requisition.component';
import { RequisitionListComponent } from './Requisition/requisition-list/requisition-list.component';
import { IndentReportComponent } from './Indent/indent-report/indent-report.component';
import { RequisitionReportsComponent } from './Requisition/requisition-reports/requisition-reports.component';
import { ProductUseComponent } from './ProductUse/product-use/product-use.component';
import { ProductUseSearchComponent } from './ProductUse/product-use-search/product-use-search.component';
import { StockValuationComponent } from './Products/stock-valuation/stock-valuation.component';
import { ProductPriceComponent } from './Products/product-price/product-price.component';
import { ProductAvailibilityComponent } from './Products/product-availibility/product-availibility.component';
import { ProductStockComponent } from './Products/product-stock/product-stock.component';
import { PurchaseReportComponent } from './Purchases/purchase-report/purchase-report.component';
import { ProductConsumptionComponent } from './Consumption/product-consumption/product-consumption.component';
import { UpdateIndentComponent } from './Indent/update-indent/update-indent.component';
import { DirectPurchaseComponent } from './Purchases/direct-purchase/direct-purchase.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { DivideTwoScreenComponent } from './core/divide-two-screen/divide-two-screen.component';
import { UpdateRequisitionComponent } from './Requisition/update-requisition/update-requisition.component';
import { DownloadIndentComponent } from './Indent/download-indent/download-indent.component';
import { ViewProductComponent } from './Products/view-product/view-product.component';
import { ReportByDepartmentComponent } from './Products/report-by-department/report-by-department.component';
import { StockHistoryComponent } from './Products/stock-history/stock-history.component';
import { StockHistoryViewComponent } from './Products/stock-history-view/stock-history-view.component';
import { MakeIndentComponent } from './Indent/make-indent/make-indent.component';
import { IndentAddComponent } from './Indent/indent-add/indent-add.component';
import { RequisitionAddComponent } from './Requisition/requisition-add/requisition-add.component';
import { SavedCurrentStockComponent } from './Products/saved-current-stock/saved-current-stock.component';

// const routes: Routes = []; SavedCurrentStockComponent
const routes: Routes = [
  {
    path: '',
    component : LoginComponent,
    canActivate : [BeforeloginService]
  },
  {
    path: '',
    component : DashboardComponent,
    // redirectTo: '/dashboard', pathMatch: 'full',
    canActivate : [AfterloginService]
  },
  {
  path: 'login',
  component : LoginComponent,
  canActivate : [BeforeloginService]
  },
  {
  path: 'signup',
  component : SignupComponent,
  canActivate : [BeforeloginService]
  },
  {
  path: 'dashboard',
  component : DashboardComponent,
  canActivate : [AfterloginService]
  },
  {path: 'addProduct',component : ProductComponent,canActivate : [AfterloginService] },
  {path: 'searchProduct',component : ProductSearchComponent,canActivate : [AfterloginService] },
  {path: 'add-stock/:id',component : PurchaseComponent,canActivate : [AfterloginService] },
  {path: 'searchPurchase',component : SearchPurchaseComponent,canActivate : [AfterloginService] },
  {path: 'purchaseReturn',component : ReturnPurchaseComponent,canActivate : [AfterloginService] },
  {path: 'purchaseInvoice',component : PurchaseInvoiceComponent,canActivate : [AfterloginService] },
  {path: 'addDepartment',component : DepartmentComponent,canActivate : [AfterloginService] },
  {path: 'listDepartment',component : DepartmentListComponent,canActivate : [AfterloginService] },
  {path: 'addSupplier',component : SupplierAddComponent,canActivate : [AfterloginService] },
  {path: 'searchSupplier',component : SupplierSearchComponent,canActivate : [AfterloginService] },
  {path: 'indent',component : IndentComponent,canActivate : [AfterloginService] },
  {path: 'indentList',component : IndentListComponent,canActivate : [AfterloginService] },
  {path: 'requisition',component : RequisitionComponent,canActivate : [AfterloginService] },
  {path: 'requisitionList',component : RequisitionListComponent,canActivate : [AfterloginService] },
  {path: 'requisitionReport/:id',component : RequisitionReportsComponent,canActivate : [AfterloginService] },
  {path: 'indent-report/:id',component : IndentReportComponent,canActivate : [AfterloginService] },
  {path: 'useStock/:id',component : ProductUseComponent,canActivate : [AfterloginService] },
  {path: 'producUseReport',component : ProductUseSearchComponent,canActivate : [AfterloginService] },
  {path: 'stockValuationReport',component : StockValuationComponent,canActivate : [AfterloginService] },
  {path: 'productPrice',component : ProductPriceComponent,canActivate : [AfterloginService] },
  {path: 'productAvailibility',component : ProductAvailibilityComponent,canActivate : [AfterloginService] },
  {path: 'productStockReport',component : ProductStockComponent,canActivate : [AfterloginService] },
  {path: 'purchaseReport',component : PurchaseReportComponent,canActivate : [AfterloginService] },
  {path: 'consumptionReport',component : ProductConsumptionComponent,canActivate : [AfterloginService] },
  {path: 'UpdateIndentComponent/:id',component : UpdateIndentComponent,canActivate : [AfterloginService] },
  {path: 'directPurchase',component : DirectPurchaseComponent,canActivate : [AfterloginService] },
  {path: 'refresh',component : RefreshComponent,canActivate : [AfterloginService] },
  {path: 'divideTwoScreen',component : DivideTwoScreenComponent,canActivate : [AfterloginService] },
  {path: 'UpdateRequisitionComponent/:id',component : UpdateRequisitionComponent,canActivate : [AfterloginService] },
  {path: 'indent-download/:id',component : DownloadIndentComponent,canActivate : [AfterloginService] },
  {path: 'view-product/:id',component : ViewProductComponent,canActivate : [AfterloginService] },
  {path: 'productvaluationByDept',component : ReportByDepartmentComponent,canActivate : [AfterloginService] },
  {path: 'stockHistory',component : StockHistoryComponent,canActivate : [AfterloginService] },
  {path: 'StockHistoryView/:id',component : StockHistoryViewComponent,canActivate : [AfterloginService] },
  {path: 'makeIndent',component : MakeIndentComponent,canActivate : [AfterloginService] },
  {path: 'addIndent',component : IndentAddComponent,canActivate : [AfterloginService] },
  {path: 'addRequisition',component : RequisitionAddComponent,canActivate : [AfterloginService] },
  {path: 'savedCurrentStock/:id',component : SavedCurrentStockComponent,canActivate : [AfterloginService] },
   
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
