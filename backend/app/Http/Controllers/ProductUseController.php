<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductUseRequest;
use Illuminate\Http\Request;
use App\ProductUse;
use App\Requisition;
use App\Product;

class ProductUseController extends Controller
{
    public function index()
    {
        $productuses = ProductUse::latest()->get();

        return response()->json($productuses);
    }

    public function store(ProductUseRequest $request)
    {
        $productuse = ProductUse::create($request->all());

        return response()->json($productuse, 201);
    }

    public function show($id)
    {
        $productuse = ProductUse::findOrFail($id);

        return response()->json($productuse);
    }

    public function update(ProductUseRequest $request, $id)
    {
        $productuse = ProductUse::findOrFail($id);
        $productuse->update($request->all());

        return response()->json($productuse, 200);
    }

    public function destroy($id)
    {
        ProductUse::destroy($id);

        return response()->json(null, 204);
    }
    public function useStock(Request $request)
    {
       $data=$request->all();
       for($i=0; $i < count((array)$data); $i++){
        if(!isset($data[$i]['quantity']))
        {
           return response()->json(0);
        }
       }
    

       for($i=0; $i < count((array)$data); $i++){
        // print_r($data[0]['id']);

        $productDetail=Product::whereId($data[$i]['product_id'])->first()->toArray();
                                    $stock_in=$productDetail['stock_in'];
                                    $stock_out=$productDetail['stock_out'];
                                    $opening_stock=$productDetail['opening_stock'];
                                    $closing_stok=$productDetail['closing_stok'];
                                    $available_stock=$productDetail['available_stock'];

        // $productManame['product_code']=$data[$i]['product_code'];
        // $productManame['product_name']=$data[$i]['productName'];
        $productManame['stock_out']=$stock_out+$data[$i]['quantity'];
        $productManame['available_stock']=$available_stock-$data[$i]['quantity'];
        // if(isset($data[$i]['product_price']))
        // {
        //      $productManame['opening_stock']=$avg;
        // }     
      

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

            $ProductUse = new ProductUse;
            $ProductUse->use_product_code =$data[$i]['product_code'];
            $ProductUse->use_product_name = $data[$i]['productName'];
            $ProductUse->use_pro_id = $data[$i]['product_id'];            
            $ProductUse->use_dep_name =$data[$i]['departmentName'];
            $ProductUse->use_dep_code =$data[$i]['department'];
            $ProductUse->use_pro_specif = $data[$i]['remarks'];
            $ProductUse->use_pro_type =  $product_type1;
            $ProductUse->use_pro_place =   $place1;
            $ProductUse->use_requisition_id = $data[$i]['requisition_id'];
            $ProductUse->use_requisition_discription = $data[$i]['requisition_discription'];
            $ProductUse->use_pro_opening =$opening_stock1;
            $ProductUse->use_pro_closing = $closing_stok1;
            $ProductUse->use_pro_price =$data[$i]['openingStock'];
            $ProductUse->use_date =$data[$i]['created_at'];
            $ProductUse->use_quanity =$data[$i]['quantity'];
            $ProductUse->use_pro_quanity =$available_stock1;
            $ProductUse->use_requisition_month =$data[$i]['requisition_month'];
            $ProductUse->use_requisition_detail_id =$data[$i]['requiitionDetailId'];            
            $ProductUse->save(); 
            $IndentUpdate['is_issued']=1;
            Requisition::where([['id', '=',$data[$i]['requisition_id']]])->update($IndentUpdate);
         }
       }
       return response()->json(1);
    }
}