<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequisitionRequest;
use App\Requisition;
use Illuminate\Http\Request;
use App\RequisitionDetail;
use App\Product;
use DB;

class RequisitionController extends Controller
{
    public function index()
    {
        $requisitions = Requisition::latest()->get();

        return response()->json($requisitions);
    }

    public function store(RequisitionRequest $request)
    {
        $requisition = Requisition::create($request->all());

        return response()->json($requisition, 201);
    }

    public function show($id)
    {
        $requisition = Requisition::findOrFail($id);

        return response()->json($requisition);
    }

    public function update(RequisitionRequest $request, $id)
    {
        $requisition = Requisition::findOrFail($id);
        $requisition->update($request->all());

        return response()->json($requisition, 200);
    }

    public function destroy($id)
    {
        Requisition::destroy($id);

        return response()->json(null, 204);
    }
    public function requisitionSave(Request $request)
    {
        $requestionAll= $request->all();
       

        $requestionDetail=$requestionAll[0];
        $requisitionId=$requestionAll[1];
        $requisitionDepartment=$requestionAll[2];
        $requestionDetailRow=$requestionDetail['itemRows']; 
         for($i=0; $i < count((array)$requestionDetailRow); $i++){
        if(!isset($requestionDetailRow[$i]['quantity']))
        {
            // echo "ok";
           return response()->json(0);
        }
        else
        {
            // echo "ok1";
            $productDetail=Product::whereId($requestionDetailRow[$i]['product_id'])->first()->toArray();
            $proAvail=$productDetail['available_stock'];
            if($proAvail<$requestionDetailRow[$i]['quantity'])
            {
                 // echo "ok2";
                 return response()->json(0);
            }
                 
        }
       }

          foreach ($requestionDetailRow as $key => $value) {

            $productDetail=Product::whereId($value['product_id'])->first()->toArray();
            $product_name_orig=$productDetail['product_name'];
            $product_name_code_orig=$productDetail['product_code'];
            $stock_in1=$productDetail['stock_in'];
            $stock_out1=$productDetail['stock_out'];
            $opening_stock1=$productDetail['opening_stock'];
            $closing_stok1=$productDetail['closing_stok'];
            $available_stock1=$productDetail['available_stock'];
            $product_type1=$productDetail['product_type'];
            $product_unit1=$productDetail['product_unit'];
            $place1=$productDetail['place'];  
            $product_specimen=$productDetail['product_specimen']; 
            $product_make=$productDetail['product_make']; 

            $saveRequisitionDetail = new RequisitionDetail;
            $saveRequisitionDetail->product_code  =$product_name_code_orig;
            $saveRequisitionDetail->product_name = $product_name_orig;
            $saveRequisitionDetail->product_id =$value['product_id'];
            $saveRequisitionDetail->speciaman =$product_specimen==null?$value['speciaman']:$product_specimen;
            $saveRequisitionDetail->make =$product_make==null?$value['make']:$product_make;
            $saveRequisitionDetail->quantity  =$value['quantity'];
            $saveRequisitionDetail->purpose =$value['purpose'];
            $saveRequisitionDetail->bf_stock =$available_stock1;
            $saveRequisitionDetail->remarks =$value['remarks'];
            $saveRequisitionDetail->requisition_id =$requisitionId;
            $saveRequisitionDetail->department =$requisitionDepartment;
            if(!$saveRequisitionDetail->save()) 
            {
                  return response()->json('error',500);
            }
              

          }
        // return  $this->requisitionDetailsReport($requisitionId);
           // return  response()->json('Success',200);
          return  response()->json($requisitionId);

    }
    public function requisitionSaveSearchable(Request $request)
    {
      $requestionAll= $request->all();
       

        $requestionDetail=$requestionAll[0];
        $requisitionId=$requestionAll[1];
        $requisitionDepartment=$requestionAll[2];
        $requestionDetailRow=$requestionDetail; 
         for($i=0; $i < count((array)$requestionDetailRow); $i++){
        if(!isset($requestionDetailRow[$i]['quantity']))
        {
            // echo "ok";
           return response()->json(0);
        }
        else
        {
            // echo "ok1";
            $productDetail=Product::whereId($requestionDetailRow[$i]['id'])->first()->toArray();
            $proAvail=$productDetail['available_stock'];
            if($proAvail<$requestionDetailRow[$i]['quantity'])
            {
                 // echo "ok2";
                 return response()->json(0);
            }
                 
        }
       }

          foreach ($requestionDetailRow as $key => $value) {

            $productDetail=Product::whereId($value['id'])->first()->toArray();
            $product_name_orig=$productDetail['product_name'];
            $product_name_code_orig=$productDetail['product_code'];
            $stock_in1=$productDetail['stock_in'];
            $stock_out1=$productDetail['stock_out'];
            $opening_stock1=$productDetail['opening_stock'];
            $closing_stok1=$productDetail['closing_stok'];
            $available_stock1=$productDetail['available_stock'];
            $product_type1=$productDetail['product_type'];
            $product_unit1=$productDetail['product_unit'];
            $place1=$productDetail['place'];  
            $product_specimen=$productDetail['product_specimen']; 
            $product_make=$productDetail['product_make']; 

            $saveRequisitionDetail = new RequisitionDetail;
            $saveRequisitionDetail->product_code  =$product_name_code_orig;
            $saveRequisitionDetail->product_name = $product_name_orig;
            $saveRequisitionDetail->product_id =$value['id'];
            $saveRequisitionDetail->speciaman =$product_specimen==null?$value['product_specimen']:$product_specimen;
            $saveRequisitionDetail->make =$product_make==null?$value['product_make']:$product_make;
            $saveRequisitionDetail->quantity  =$value['quantity'];
            $saveRequisitionDetail->purpose =$value['purpose'];
            $saveRequisitionDetail->bf_stock =$available_stock1;
            $saveRequisitionDetail->remarks =$value['remark'];
            $saveRequisitionDetail->requisition_id =$requisitionId;
            $saveRequisitionDetail->department =$requisitionDepartment;
            if(!$saveRequisitionDetail->save()) 
            {
                  return response()->json('error',500);
            }
              

          }
        // return  $this->requisitionDetailsReport($requisitionId);
           // return  response()->json('Success',200);
          return  response()->json($requisitionId);  
    }
    public function requisitionDetailsReport($id)
    {
      $requisitions=DB::table('requisitions')->join('requisition_details','requisitions.id','=','requisition_details.requisition_id')
      ->join('departments','departments.id','=','requisitions.requisition_department')
      ->join('products','products.id','=','requisition_details.product_id') 
      ->where('requisitions.id','=',$id)
      ->where('requisitions.deleted_at','=',null)
      ->where('requisition_details.deleted_at','=',null)
      ->select('requisition_details.*','requisition_details.id as requiitionDetailId','requisitions.*','requisitions.id as requestionId','departments.department as departmentName','departments.description as departmentDescription','products.product_department_Name as ProductDepartmentName','products.product_type as product_type','products.product_type as productType','products.product_unit as productUnit','products.product_color as productColor','products.product_igst as productIgst','products.product_cgst as productCgst','products.product_sgst as productSgst','products.product_gst as productGst','products.product_name as productName','products.place as productPlace','requisitions.is_issued as is_issued','products.product_unit as productUnit','products.available_stock as product_available_stock','products.opening_stock as openingStock')
      ->get();
        return response()->json($requisitions);
    }
    public function productConsumedData(Request $request)
    {
          $productData= DB::table('product_uses')->join('products','products.id','=','product_uses.use_pro_id');
            $productData->where('product_uses.deleted_at','=',null);
            if($request->has('fromDate') && $request->fromDate !=''){
                $productData->whereDate('product_uses.use_date', '>=', $request->fromDate);
            }
            if($request->has('todate') && $request->todate !=''){
                $productData->whereDate('product_uses.use_date', '<=', $request->todate);
            }
            if($request->has('productCode') && $request->productCode !=''){
                $productData->where('product_uses.use_product_code', '=', $request->productCode);
            }
            if($request->has('departmentId') && $request->departmentId !=''){
                $productData->where('product_uses.use_dep_code', '=', $request->departmentId);
            }
           
            $productData->select('product_uses.*','products.product_unit','products.product_gst');
            $productData->orderBy('id','desc');
            $productData= $productData->get();
             return response()->json($productData);
    }
    public function productPurchaseData(Request $request)
    {
        // DB::enableQueryLog();
             $productData= DB::table('purchases')->join('products','products.id','=','purchases.pur_pro_id')->join('indent_details','indent_details.id','=','purchases.pur_indent_detail_id');
            $productData->where('purchases.deleted_at','=',null);
            if($request->has('fromDate') && $request->fromDate !=''){
                $productData->whereDate('purchases.pur_date', '>=', $request->fromDate);
            }
            if($request->has('todate') && $request->todate !=''){
                $productData->whereDate('purchases.pur_date', '<=', $request->todate);
            }
            if($request->has('fromCreatedDate') && $request->fromCreatedDate !=''){
                $productData->whereDate('purchases.created_at', '>=', $request->fromCreatedDate);
            }
            if($request->has('toCreatedDate') && $request->toCreatedDate !=''){
                $productData->whereDate('purchases.created_at', '<=', $request->toCreatedDate);
            }
            if($request->has('productCode') && $request->productCode !=''){
                $productData->where('purchases.pur_product_code', '=', $request->productCode);
            }
            if($request->has('departmentId') && $request->departmentId !=''){
                $productData->where('purchases.pur_dep_code', '=', $request->departmentId);
            }
            if($request->has('purchaseInvoice') && $request->purchaseInvoice !=''){
                $productData->where('purchases.pur_purchaseInvoie', '=', $request->purchaseInvoice);
            }
            if($request->has('supplierId') && $request->supplierId !=''){
                $productData->where('purchases.pur_supplierId', '=', $request->supplierId);
            }
            if($request->has('indent') && $request->indent !=''){
                $productData->where('purchases.pur_indent_id', '=', $request->indent);
            }
           
            $productData->select('purchases.*','products.product_unit','products.product_gst','indent_details.purpose as purpose');
            $productData->orderBy('id','desc');
            $productData= $productData->distinct()->get();
             // $laQuery = DB::getQueryLog();
            // print_r($laQuery);
            // DB::disableQueryLog();
             return response()->json($productData);
    }
}