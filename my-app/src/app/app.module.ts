import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './Products/product/product.component';
import { PurchaseComponent } from './Purchases/purchase/purchase.component';
import { HeaderComponent } from './core/header/header.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ConfigPanelComponent } from './core/config-panel/config-panel.component';
import { DepartmentComponent } from './Departments/department/department.component';
import { DepartmentListComponent } from './Departments/department-list/department-list.component';
import { SupplierAddComponent } from './Suppliers/supplier-add/supplier-add.component';
import { SupplierSearchComponent } from './Suppliers/supplier-search/supplier-search.component';
import { ProductSearchComponent } from './Products/product-search/product-search.component';
import { SearchPurchaseComponent } from './Purchases/search-purchase/search-purchase.component';
import { ReturnPurchaseComponent } from './Purchases/return-purchase/return-purchase.component';
import { PurchaseInvoiceComponent } from './Purchases/purchase-invoice/purchase-invoice.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule, MatFormFieldModule,MatProgressSpinnerModule,MatDialogModule,MatButtonModule,MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExcelService } from './Services/excel.service';
import { IndentComponent } from './Indent/indent/indent.component';
import { IndentListComponent } from './Indent/indent-list/indent-list.component';
import { RequisitionComponent } from './Requisition/requisition/requisition.component';
import { RequisitionListComponent } from './Requisition/requisition-list/requisition-list.component';
import { IndentReportComponent } from './Indent/indent-report/indent-report.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InsertedProductComponent } from './Products/inserted-product/inserted-product.component';
import { RequisitionReportsComponent } from './Requisition/requisition-reports/requisition-reports.component';
import { ProductUseComponent } from './ProductUse/product-use/product-use.component';
import { ProductPriceComponent } from './Products/product-price/product-price.component';
import { ProductAvailibilityComponent } from './Products/product-availibility/product-availibility.component';
import { ProductUseSearchComponent } from './ProductUse/product-use-search/product-use-search.component';
import { DatePipe } from '@angular/common';
import { StockValuationComponent } from './Products/stock-valuation/stock-valuation.component';
import { ProductStockComponent } from './Products/product-stock/product-stock.component';
import { PurchaseReportComponent } from './Purchases/purchase-report/purchase-report.component';
import { ProductConsumptionComponent } from './Consumption/product-consumption/product-consumption.component';
import { UpdateIndentComponent } from './Indent/update-indent/update-indent.component';
import { DirectPurchaseComponent } from './Purchases/direct-purchase/direct-purchase.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { BradComponent } from './core/brad/brad.component';
import { DivideTwoScreenComponent } from './core/divide-two-screen/divide-two-screen.component';
import { AddIndentDetailComponent } from './Indent/add-indent-detail/add-indent-detail.component';
import { UpdateRequisitionComponent } from './Requisition/update-requisition/update-requisition.component';
import { DownloadIndentComponent } from './Indent/download-indent/download-indent.component';
import { ViewProductComponent } from './Products/view-product/view-product.component';
import { NgxElectronModule } from 'ngx-electron';
import { ReportByDepartmentComponent } from './Products/report-by-department/report-by-department.component';
import { StockHistoryComponent } from './Products/stock-history/stock-history.component';
import { StockHistoryViewComponent } from './Products/stock-history-view/stock-history-view.component';
import { MakeIndentComponent } from './Indent/make-indent/make-indent.component';
import { IndentAddComponent } from './Indent/indent-add/indent-add.component';
import { RequisitionAddComponent } from './Requisition/requisition-add/requisition-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SavedCurrentStockComponent } from './Products/saved-current-stock/saved-current-stock.component';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
// import { DoBComponentComponent } from './Purchases/do-bcomponent/do-bcomponent.component';
// import { HelloComponent } from './hello.component';
// import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    PurchaseComponent,
    HeaderComponent,
    NavbarComponent,
    ConfigPanelComponent,
    DepartmentComponent,
    DepartmentListComponent,
    SupplierAddComponent,
    SupplierSearchComponent,
    ProductSearchComponent,
    SearchPurchaseComponent,
    ReturnPurchaseComponent,
    PurchaseInvoiceComponent,
    IndentComponent,
    IndentListComponent,
    RequisitionComponent,
    RequisitionListComponent,
    IndentReportComponent,
    InsertedProductComponent,
    RequisitionReportsComponent,
    ProductUseComponent,
    ProductPriceComponent,
    ProductAvailibilityComponent,
    ProductUseSearchComponent,
    StockValuationComponent,
    ProductStockComponent,
    PurchaseReportComponent,
    ProductConsumptionComponent,
    UpdateIndentComponent,
    DirectPurchaseComponent,
    RefreshComponent,
    BradComponent,
    DivideTwoScreenComponent,
    AddIndentDetailComponent,
    UpdateRequisitionComponent,
    DownloadIndentComponent,
    ViewProductComponent,
    ReportByDepartmentComponent,
    StockHistoryComponent,
    StockHistoryViewComponent,
    MakeIndentComponent,
    IndentAddComponent,
    RequisitionAddComponent,
    SavedCurrentStockComponent,
    // DoBComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DataTablesModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule ,
    MatProgressSpinnerModule,
    MatDialogModule,MatButtonModule,MatCardModule,Ng2SmartTableModule,NgxElectronModule,NgSelectModule
    // Angular5Csv
  ],
  providers: [ExcelService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
