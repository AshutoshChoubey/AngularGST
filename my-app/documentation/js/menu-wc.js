'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' : 'data-target="#xs-components-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' :
                                            'id="xs-components-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' }>
                                            <li class="link">
                                                <a href="components/AddIndentDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddIndentDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BradComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BradComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfigPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfigPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DirectPurchaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DirectPurchaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DivideTwoScreenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DivideTwoScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DownloadIndentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DownloadIndentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndentReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndentReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InsertedProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InsertedProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductAvailibilityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductAvailibilityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductConsumptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductConsumptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductPriceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPriceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductStockComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductStockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductUseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductUseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductUseSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductUseSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PurchaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PurchaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PurchaseInvoiceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PurchaseInvoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PurchaseReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PurchaseReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RefreshComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RefreshComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportByDepartmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReportByDepartmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequisitionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequisitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequisitionListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequisitionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequisitionReportsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequisitionReportsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReturnPurchaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReturnPurchaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchPurchaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchPurchaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockHistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockHistoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockHistoryViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockHistoryViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockValuationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockValuationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SupplierAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SupplierAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SupplierSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SupplierSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateIndentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UpdateIndentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateRequisitionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UpdateRequisitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewProductComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' : 'data-target="#xs-injectables-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' :
                                        'id="xs-injectables-links-module-AppModule-d4863bf0f814d2816694dd849d3f8ace"' }>
                                        <li class="link">
                                            <a href="injectables/ExcelService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExcelService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentServiceService.html" data-type="entity-link">DepartmentServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcelService.html" data-type="entity-link">ExcelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportExcelService.html" data-type="entity-link">ExportExcelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndentService.html" data-type="entity-link">IndentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JarwisService.html" data-type="entity-link">JarwisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link">ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequisitionService.html" data-type="entity-link">RequisitionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupplierService.html" data-type="entity-link">SupplierService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link">TokenService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AfterloginService.html" data-type="entity-link">AfterloginService</a>
                            </li>
                            <li class="link">
                                <a href="guards/BeforeloginService.html" data-type="entity-link">BeforeloginService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Department.html" data-type="entity-link">Department</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Indent.html" data-type="entity-link">Indent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product-1.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product-2.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Purchase.html" data-type="entity-link">Purchase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Purchase-1.html" data-type="entity-link">Purchase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Purchase-2.html" data-type="entity-link">Purchase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Requisition.html" data-type="entity-link">Requisition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Supplier.html" data-type="entity-link">Supplier</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});