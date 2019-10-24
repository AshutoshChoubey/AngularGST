<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepPurReportRequest;
use Illuminate\Http\Request;
use App\DepPurReport;
use App\SaveValuation;
use App\DepConsumeReport;
use App\DepStockReport;
use App\Product;
use App\SavedCurrentStock;
use DB;

class DepPurReportController extends Controller
{
    public function index()
    {
        $deppurreports = DepPurReport::latest()->get();

        return response()->json($deppurreports);
    }

    public function store(DepPurReportRequest $request)
    {
        $deppurreport = DepPurReport::create($request->all());

        return response()->json($deppurreport, 201);
    }

    public function show($id)
    {
        $deppurreport = DepPurReport::findOrFail($id);

        return response()->json($deppurreport);
    }

    public function update(DepPurReportRequest $request, $id)
    {
        $deppurreport = DepPurReport::findOrFail($id);
        $deppurreport->update($request->all());

        return response()->json($deppurreport, 200);
    }

    public function destroy($id)
    {
        DepPurReport::destroy($id);

        return response()->json(null, 204);
    }
    public function saveReport(Request $request)
    {
        $save_valuations=    request()->except(['StockValuationReport','productByDepartmentstockvaluationForPurchase','productByDepartmentstockvaluationForConsume']);
        $StockVal = new SaveValuation($save_valuations);
        $StockVal->save();
        $valuationId=$StockVal->id;
        $StockValuationReport=$request->StockValuationReport;
         $productByDepartmentstockvaluationForPurchase=$request->productByDepartmentstockvaluationForPurchase;
        $productByDepartmentstockvaluationForConsume=$request->productByDepartmentstockvaluationForConsume;

         $productDetailGet=DB::table('products')->get();
          $productDetailGet=json_decode(json_encode($productDetailGet), true);
         
         for($i=0; $i < count((array)$productDetailGet); $i++){
              $SavedCurrentStock = new SavedCurrentStock;
              $SavedCurrentStock->product_id  =$productDetailGet[$i]['id'] ; 
              $SavedCurrentStock->valuation_id=  $valuationId;                             
              $SavedCurrentStock->product_code    =$productDetailGet[$i]['product_code'] ;  
              $SavedCurrentStock->product_name    =$productDetailGet[$i]['product_name'] ;  
              $SavedCurrentStock->product_department    =$productDetailGet[$i]['product_department'] ;  
              $SavedCurrentStock->product_department_Name    =$productDetailGet[$i]['product_department_Name'] ;  
              $SavedCurrentStock->product_specification    =$productDetailGet[$i]['product_specification'] ;  
              $SavedCurrentStock->product_unit      =$productDetailGet[$i]['product_unit'] ;  
              $SavedCurrentStock->product_color    =$productDetailGet[$i]['product_color'] ;  
              $SavedCurrentStock->product_hsn  =$productDetailGet[$i]['product_hsn'] ;  
              $SavedCurrentStock->product_specimen   =$productDetailGet[$i]['product_specimen'] ;  
              $SavedCurrentStock->product_make    =$productDetailGet[$i]['product_make'] ;  
              $SavedCurrentStock->place     =$productDetailGet[$i]['place'] ;  
              $SavedCurrentStock->product_igst          =$productDetailGet[$i]['product_igst'] ;  
              $SavedCurrentStock->product_cgst            =$productDetailGet[$i]['product_cgst'] ;  
              $SavedCurrentStock->product_sgst            =$productDetailGet[$i]['product_sgst'] ;  
              $SavedCurrentStock->product_gst              =$productDetailGet[$i]['product_gst'] ;  
              $SavedCurrentStock->stock_in                  =$productDetailGet[$i]['stock_in'] ;     
              $SavedCurrentStock->stock_out                 =$productDetailGet[$i]['stock_out'] ;              
              $SavedCurrentStock->available_stock          =$productDetailGet[$i]['available_stock'] ;  
              $SavedCurrentStock->opening_stock            =$productDetailGet[$i]['opening_stock'] ;  
              $SavedCurrentStock->closing_stok              =$productDetailGet[$i]['closing_stok'] ;  
                $SavedCurrentStock->save(); 
               // $saveIndentDetail->price =$productDetailGet[$i]['sum'];            
         }
      for($i=0; $i < count((array)$StockValuationReport); $i++){
              $saveIndentDetail = new DepStockReport;
              $saveIndentDetail->price =$StockValuationReport[$i]['sum'];
              $saveIndentDetail->department_id = $StockValuationReport[$i]['product_department'];
              $saveIndentDetail->department_name =$StockValuationReport[$i]['product_department_Name'];
              $saveIndentDetail->user_id =$request->user_id;
              $saveIndentDetail->valuation_id=$valuationId;
              $saveIndentDetail->save();               
         }
         for($i=0; $i < count((array)$productByDepartmentstockvaluationForPurchase); $i++){
              $saveIndentDetail = new DepPurReport;
              $saveIndentDetail->price =$productByDepartmentstockvaluationForPurchase[$i]['sum'];
              $saveIndentDetail->department_id = $productByDepartmentstockvaluationForPurchase[$i]['product_department'];
              $saveIndentDetail->department_name =$productByDepartmentstockvaluationForPurchase[$i]['product_department_Name'];
              $saveIndentDetail->user_id =$request->user_id;
              $saveIndentDetail->valuation_id=$valuationId;
              $saveIndentDetail->save();               
         }
         for($i=0; $i < count((array)$productByDepartmentstockvaluationForConsume); $i++){
              $DepConsumeReport = new DepConsumeReport;
              $DepConsumeReport->price =$productByDepartmentstockvaluationForConsume[$i]['sum'];
              $DepConsumeReport->department_id = $productByDepartmentstockvaluationForConsume[$i]['product_department'];
              $DepConsumeReport->department_name =$productByDepartmentstockvaluationForConsume[$i]['product_department_Name'];
              $DepConsumeReport->user_id =$request->user_id;
              $DepConsumeReport->valuation_id=$valuationId;
              $DepConsumeReport->save();               
         }
    }       
}