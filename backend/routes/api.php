<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([

    'middleware' => 'api',
    // 'namespace' => 'App\Http\Controllers',
    // 'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});
Route::resource('departments', 'DepartmentController');
Route::resource('products', 'ProductController');Route::resource('suppliers', 'SupplierController');
Route::resource('supplierdebitlogs', 'SupplierDebitLogController');Route::resource('indents', 'IndentController');

Route::resource('requisitions', 'RequisitionController');
Route::post('requisitionSave', 'RequisitionController@requisitionSave');
Route::post('requisitionSaveSearchable', 'RequisitionController@requisitionSaveSearchable');

Route::get('requisitionDetailsReport/{id}', 'RequisitionController@requisitionDetailsReport');
Route::post('useStock', 'ProductUseController@useStock');
Route::get('stockValuationReport', 'StockValuationController@stockValuationReport');

Route::post('indentSave/{id}/{indentForMonth}', 'IndentDetailController@Indentsave');
Route::post('indentMake/{id}/{indentForMonth}', 'IndentDetailController@indentMake');
Route::get('getIndentDetail/{id}', 'IndentDetailController@IndentDetailsReport');
Route::resource('indentdetails', 'IndentDetailController');
Route::get('/lastInertedProduct', 'ProductController@lastInertedProduct');
Route::resource('purchases', 'PurchaseController');
Route::post('stockAdd', 'IndentDetailController@stockAdd');
Route::resource('productprices', 'ProductPriceController');
Route::resource('productuses', 'ProductUseController');
Route::resource('requisitiondetails', 'RequisitionDetailController');
Route::resource('stockvaluations', 'StockValuationController');
Route::Post('productSearch','PurchaseController@search');
Route::post('productConsumedData','RequisitionController@productConsumedData');
Route::post('productPurchaseData','RequisitionController@productPurchaseData');
Route::post('stockValuationSearchedReport','StockValuationController@stockValuationSearchedReport');
Route::get('indentDelete', 'IndentController@indentDelete');
Route::get('getIndentDetailForPurhase/{id}', 'IndentDetailController@getIndentDetailForPurhase');
// Route::post('reportByDepartment', 'ProductController@reportByDepartment');
Route::post('reportByDepartment', 'ProductController@reportByDepartment');
Route::get('getViewSavedStock/{id}', 'SaveValuationController@getViewSavedStock');

Route::resource('deppurreports', 'DepPurReportController');
Route::post('saveReport', 'DepPurReportController@saveReport');
Route::resource('savevaluations', 'SaveValuationController');
Route::resource('depconsumereports', 'DepConsumeReportController');
Route::resource('depstockreports', 'DepStockReportController');
Route::get('getpurhase', 'PurchaseController@getpurhase');
Route::get('getproductuses', 'PurchaseController@getproductuses');
Route::resource('savedcurrentstocks', 'SavedCurrentStockController');
Route::get('getSavedCurrentStock/{id}', 'SavedCurrentStockController@getSavedCurrentStock');
Route::Post('currentProductStockSearch','PurchaseController@currentProductStockSearch');
//Route::Post('productSearch','PurchaseController@search');


