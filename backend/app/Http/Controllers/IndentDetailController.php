<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndentDetailRequest;
use Illuminate\Http\Request;
use App\IndentDetail;
use DB;
use App\Product;
use App\Purchase;
use App\Indent;
use App\Supplier;

class IndentDetailController extends Controller
{
    public function index()
    {
        $indentdetails = IndentDetail::latest()->get();

        return response()->json($indentdetails);
    }

    public function store(IndentDetailRequest $request)
    {
        $indentdetail = IndentDetail::create($request->all());

        return response()->json($indentdetail, 201);
    }

    public function show($id)
    {
        $indentdetail = IndentDetail::findOrFail($id);

        return response()->json($indentdetail);
    }

    public function update(IndentDetailRequest $request, $id)
    {
        $indentdetail = IndentDetail::findOrFail($id);
        $indentdetail->update($request->all());

        return response()->json($indentdetail, 200);
    }

    public function destroy($id)
    {
        IndentDetail::destroy($id);

        return response()->json(null, 204);
    }
    public function Indentsave(IndentDetailRequest $request, $id,$department)
    {

        for($i=0; $i < count((array)$request->itemRows); $i++){
           $productDetail=Product::whereId($request->itemRows[$i]['product_name'])->first()->toArray();
            $product_name_orig=$productDetail['product_name'];
             $product_code_orig=$productDetail['product_code'];
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

              $saveIndentDetail = new IndentDetail;
              $saveIndentDetail->product_code =$product_code_orig;
              $saveIndentDetail->product_id =  $request->itemRows[$i]['product_name'];
              $saveIndentDetail->product_name =  $product_name_orig;
              $saveIndentDetail->speciaman =$product_specimen==null?$request->itemRows[$i]['speciaman']:$product_specimen;
              $saveIndentDetail->make =$product_make==null?$request->itemRows[$i]['make']:$product_make;
              $saveIndentDetail->quantity = $request->itemRows[$i]['quantity'];
              $saveIndentDetail->purpose =  $request->itemRows[$i]['purpose'];
              $saveIndentDetail->bf_stock =  $available_stock1;
              $saveIndentDetail->remarks =  $request->itemRows[$i]['remarks'];
              $saveIndentDetail->indent_id = $id;
              $saveIndentDetail->department =$department;
              $saveIndentDetail->save();   
              // echo $saveIndentDetail->product_code ;
                           
         }
         // $IndentDetailjson= IndentDetail::where('indent_id','=',$id)->get(); 
         // return response()->json($this->IndentDetailsReport1($id));
           return response()->json($id);

    }
    public  function indentMake(IndentDetailRequest $request, $id,$department)
    {
       $data=$request->all();
       for($i=0; $i < count((array)$data); $i++){
           $productDetail=Product::whereId($data[$i]['id'])->first()->toArray();
            $product_name_orig=$productDetail['product_name'];
             $product_code_orig=$productDetail['product_code'];
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

              $saveIndentDetail = new IndentDetail;
              $saveIndentDetail->product_code =$product_code_orig;
              $saveIndentDetail->product_id =  $data[$i]['id'];
              $saveIndentDetail->product_name =  $product_name_orig;
              $saveIndentDetail->speciaman =$product_specimen==null?$data[$i]['product_specimen']:$product_specimen;
              $saveIndentDetail->make =$product_make==null?$data[$i]['product_make']:$product_make;
              $saveIndentDetail->quantity = $data[$i]['quantity'];
              $saveIndentDetail->purpose =  $data[$i]['purpose'];
              $saveIndentDetail->bf_stock =  $available_stock1;
              $saveIndentDetail->remarks =  $data[$i]['remark'];
              $saveIndentDetail->indent_id = $id;
              $saveIndentDetail->department =$department;
              $saveIndentDetail->save();               
         }
        
           return response()->json($id);
    }
    public function IndentDetailsReport($id)
    {
      $indent=DB::table('indents')->join('indent_details','indents.id','=','indent_details.indent_id')
      ->join('departments','departments.id','=','indents.indent_department')
      ->join('products','products.id','=','indent_details.product_id')
      ->where('indents.id','=',$id)
      ->where('indents.deleted_at','=',null)
      ->where('indent_details.deleted_at','=',null)
      ->select('indent_details.*','indents.id as indentId','indents.indent_month as indentMonth','indents.indent_discription as indentDiscription','indents.indent_department as indentDepartmentId','departments.department as departmentName','departments.description as departmentDescription','products.product_department_Name as ProductDepartmentName','products.product_type as product_type','products.product_type as productType','products.product_unit as productUnit','products.product_color as productColor','products.product_igst as productIgst','products.product_cgst as productCgst','products.product_sgst as productSgst','products.product_gst as productGst','products.product_name as productName','products.place as productPlace','indents.is_purchase as is_purchase','products.product_unit as productUnit','products.available_stock as product_available_stock','products.opening_stock as openingStock')
      ->get();
        return response()->json($indent);
    }
     public function IndentDetailsReport1($id)
    {


      $indent=DB::table('indents')->join('indent_details','indents.id','=','indent_details.indent_id')
      ->join('departments','departments.id','=','indents.indent_department')
      ->where('indents.id','=',$id)
      ->where('indents.deleted_at','=',null)
      ->where('indent_details.deleted_at','=',null)
      ->join('products','products.id','=','indent_details.product_id')
      ->select('indent_details.*','indents.id as indentId','indents.indent_month as indentMonth','indents.indent_discription as indentDiscription','indents.indent_department as indentDepartmentId','departments.department as departmentName','departments.description as departmentDescription')
      ->get();
       // print_r($indent);
       // echo $id;
        return $indent;
    

    }
    public function stockAdd(Request $request)
    {
      $data=$request->all();
       for($i=0; $i < count((array)$data); $i++){
        if(!isset($data[$i]['product_price']))
        {
           return response()->json(0);
        }
        // echo $data[$i]['product_price'];
        // echo "<br/>";
        // echo "if(".$data[$i]['Indentquantity']."<(".$data[$i]['quantity']."+".$data[$i]['purchase_quantity']."))";
        $checkPurchase=(float)$data[$i]['quantity']+(float)$data[$i]['purchase_quantity'];
         if($data[$i]['Indentquantity']<$checkPurchase)
        {
           // echo $data[$i]['product_price'];
        // echo "<br/>";
           return response()->json(0);
        }
       }
    
// print_r($data);
// exit;
       for($i=0; $i < count((array)$data); $i++){
        // print_r($data[0]['id']);

        $productDetail=Product::whereId($data[$i]['product_id'])->first()->toArray();
                                    $stock_in=$productDetail['stock_in'];
                                    $stock_out=$productDetail['stock_out'];
                                    $opening_stock=$productDetail['opening_stock'];
                                    $closing_stok=$productDetail['closing_stok'];
                                    $available_stock=$productDetail['available_stock'];
                                    if($opening_stock>0)
                                    {
                                      $avg= $opening_stock+$data[$i]['product_price'];
                                      $avg=$avg/2;
                                    }
                                    else
                                    {
                                      $avg= $data[$i]['product_price'];
                                      $avg=$avg;
                                    }
                                   

        $productManame['product_cgst']=$data[$i]['productCgst'];
        $productManame['product_sgst']=$data[$i]['productSgst'];
        $productManame['product_igst']=$data[$i]['productIgst'];
        $productManame['product_gst']= $data[$i]['productCgst']+$data[$i]['productSgst']+$data[$i]['productIgst'];
        $productManame['stock_in']=$stock_in+$data[$i]['quantity'];
        $productManame['available_stock']= $available_stock+$data[$i]['quantity'];
        if(isset($data[$i]['product_price']))
        {
             $productManame['opening_stock']=$avg;
        }     
        $productManame['closing_stok']=$opening_stock;
         if(Product::where([['id', '=',$data[$i]['product_id']]])->update($productManame))
         {
              $productDetail=Product::whereId($data[$i]['product_id'])->first()->toArray();
              $stock_in1=$productDetail['stock_in'];
              $stock_out1=$productDetail['stock_out'];
              $opening_stock1=$productDetail['opening_stock'];
              $closing_stok1=$productDetail['closing_stok'];
              $available_stock1=$productDetail['available_stock'];
              $product_type1=$productDetail['product_type'];
              $product_unit1=$productDetail['product_unit'];
              $place1=$productDetail['place'];
                $SupplierDetail=Supplier::whereId($data[$i]['supplier'])->first()->toArray();
              $supplier_name=$SupplierDetail['supplier_name'];

            $Purchase = new Purchase;
            $Purchase->pur_product_cgst =$data[$i]['productCgst'];
            $Purchase->pur_product_sgst =$data[$i]['productSgst'];
            $Purchase->pur_product_igst =$data[$i]['productIgst'];
            $Purchase->pur_product_gst  = $data[$i]['productCgst']+$data[$i]['productSgst']+$data[$i]['productIgst'];
            $Purchase->pur_supplierId  =$data[$i]['supplier'];
            $Purchase->pur_supplierName  =$supplier_name;
            $Purchase->pur_purchaseInvoie  =$data[$i]['purchaseInvoie'];

            $Purchase->pur_product_code =$data[$i]['product_code'];
            $Purchase->pur_product_name = $data[$i]['productName'];
            $Purchase->pur_pro_id = $data[$i]['product_id'];            
            $Purchase->pur_dep_name =$data[$i]['departmentName'];
            $Purchase->pur_dep_code =$data[$i]['department'];
            $Purchase->pur_pro_specif = $data[$i]['remarks'];
            $Purchase->pur_pro_type =  $product_type1;
            $Purchase->pur_pro_place =   $place1;
            $Purchase->pur_indent_id = $data[$i]['indentId'];
            $Purchase->pur_indent_discription = $data[$i]['indentDiscription'];
            $Purchase->pur_pro_opening =$opening_stock1;
            $Purchase->pur_pro_closing = $closing_stok1;
            $Purchase->pur_pro_price =$data[$i]['product_price'];
            $Purchase->pur_date =$data[$i]['created_at'];
            $Purchase->pur_quanity = $data[$i]['quantity'];
            $Purchase->pur_pro_quanity = $available_stock;
            $Purchase->pur_indent_month =$data[$i]['indentMonth'];
            $Purchase->pur_indent_detail_id =$data[$i]['id'];
            $Purchase->save(); 
            // $IndentUpdate['is_purchase']=1;
            // Indent::where([['id', '=',$data[$i]['indent_id']]])->update($IndentUpdate);
           $indentDetailData= IndentDetail::whereId($data[$i]['id'])->first()->toArray();
           // print_r($indentDetailData['purchase_quantity']);
           // echo "<br/>";
           $IndentDetailUpdate['is_purchase_complete']= 0;
           $purchaseQuantity=$indentDetailData['purchase_quantity']+$data[$i]['quantity'];
           if($purchaseQuantity==$data[$i]['Indentquantity'])
           {
            $IndentDetailUpdate['is_purchase_complete']= 1;
           }
              
            $IndentDetailUpdate['purchase_quantity']= $purchaseQuantity;
             IndentDetail::where([['id', '=',$data[$i]['id']]])->update($IndentDetailUpdate);
            
         }

       


       
       }
        $indent=DB::table('indent_details')
                ->where('indent_details.indent_id','=',$data[0]['indent_id'])
                // ->where('indents.deleted_at','=',null)
                ->where('indent_details.is_purchase_complete','=',0)
                ->where('indent_details.deleted_at','=',null)
                ->select('indent_details.id')->count();
             // print_r($indent);  
             if($indent==0)
             {
              $IndentUpdate['is_purchase']=1;
              Indent::where([['id', '=',$data[0]['indent_id']]])->update($IndentUpdate);
             }
       return response()->json(1);
    }
     public function getIndentDetailForPurhase($id)
    {
      $indent=DB::table('indents')->join('indent_details','indents.id','=','indent_details.indent_id')
      ->join('departments','departments.id','=','indents.indent_department')
      ->join('products','products.id','=','indent_details.product_id')
      ->where('indents.id','=',$id)
      ->where('indents.deleted_at','=',null)
      ->where('indent_details.is_purchase_complete','=',0)
      ->where('indent_details.deleted_at','=',null)
      ->select('indent_details.*','indent_details.id as indentDetailId','indents.id as indentId','indents.indent_month as indentMonth','indents.indent_discription as indentDiscription','indents.indent_department as indentDepartmentId','departments.department as departmentName','departments.description as departmentDescription','products.product_department_Name as ProductDepartmentName','products.product_type as product_type','products.product_type as productType','products.product_unit as productUnit','products.product_color as productColor','products.product_igst as productIgst','products.product_cgst as productCgst','products.product_sgst as productSgst','products.product_gst as productGst','products.product_name as productName','products.place as productPlace','indents.is_purchase as is_purchase','products.product_unit as productUnit','products.available_stock as product_available_stock','products.opening_stock as openingStock','indent_details.purchase_quantity as purchase_quantity')
      ->get();
        return response()->json($indent);
    }
}