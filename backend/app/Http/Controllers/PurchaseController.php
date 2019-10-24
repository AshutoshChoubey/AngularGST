<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseRequest;
use Illuminate\Http\Request;
use DB;
use App\Purchase;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::latest()->get();

        return response()->json($purchases);
    }

    public function store(PurchaseRequest $request)
    {
        $purchase = Purchase::create($request->all());

        return response()->json($purchase, 201);
    }

    public function show($id)
    {
        $purchase = Purchase::findOrFail($id);

        return response()->json($purchase);
    }

    public function update(PurchaseRequest $request, $id)
    {
        $purchase = Purchase::findOrFail($id);
        $purchase->update($request->all());

        return response()->json($purchase, 200);
    }

    public function destroy($id)
    {
        Purchase::destroy($id);

        return response()->json(null, 204);
    }
    public function search(Request $request)
    {
        DB::enableQueryLog();
            $productData= DB::table('products');
            $productData->where('products.deleted_at','=',null);
            if($request->has('fromDate') && $request->fromDate !=''){
                $productData->whereDate('products.created_at', '>=', $request->fromDate);
            }
            if($request->has('todate') && $request->todate !=''){
                $productData->whereDate('products.created_at', '<=', $request->todate);
            }
            if($request->has('productCode') && $request->productCode !=''){
                $productData->where('products.product_code', '=', $request->productCode);
            }
             if($request->has('departmentId') && $request->departmentId !=''){
                $productData->where('products.product_department', '=', $request->departmentId);
            }
           
            $productData->select('products.*');
            $productData->orderBy('id','desc');
            $productData= $productData->get();
            $laQuery = DB::getQueryLog();
            // print_r($laQuery);
            DB::disableQueryLog();
         return response()->json($productData);
    }
    public function getpurhase()
    {
         $productData= DB::table('purchases')->join('products','products.id','=','purchases.pur_pro_id');
             $productData->join('indent_details','indent_details.id','=','purchases.pur_indent_detail_id');
             $productData->where('purchases.deleted_at','=',null);
            $productData->select('purchases.*','products.product_unit','products.product_gst','indent_details.purpose as purpose');
            $productData->orderBy('id','desc');
            $productData= $productData->get();
             return response()->json($productData);

    }
    public function getproductuses()
    {
        $productData= DB::table('product_uses')->join('products','products.id','=','product_uses.use_pro_id');
            $productData->where('product_uses.deleted_at','=',null);
            $productData->select('product_uses.*','products.product_unit','products.product_gst');
            $productData->orderBy('id','desc');
            $productData= $productData->get();
             return response()->json($productData);
    }
    public function currentProductStockSearch(Request $request)
    {
         DB::enableQueryLog();
         // print_r($request->valuation_id);
            $productData= DB::table('saved_current_stocks')->where('valuation_id','=',$request->valuation_id);
            // $productData->where('saved_current_stocks.deleted_at','=',null);
            // if($request->has('fromDate') && $request->fromDate !=''){
            //     $productData->whereDate('saved_current_stocks.created_at', '>=', $request->fromDate);
            // }
            // if($request->has('todate') && $request->todate !=''){
            //     $productData->whereDate('saved_current_stocks.created_at', '<=', $request->todate);
            // }
            if($request->has('productCode') && $request->productCode !=''){
                $productData->where('saved_current_stocks.product_code', '=', $request->productCode);
            }
             if($request->has('departmentId') && $request->departmentId !=''){
                $productData->where('saved_current_stocks.product_department', '=', $request->departmentId);
            }
           
            $productData->select('saved_current_stocks.*');
            $productData->orderBy('id','desc');
            $productData= $productData->get();
            $laQuery = DB::getQueryLog();
            // print_r($laQuery);
            DB::disableQueryLog();
         return response()->json($productData);
    }
}