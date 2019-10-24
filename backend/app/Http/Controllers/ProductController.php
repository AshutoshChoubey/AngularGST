<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Product;
use DB;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->orderBy('product_name','asc')->get();

        return response()->json($products);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        Product::destroy($id);

        return response()->json(null, 204);
    }
    public function lastInertedProduct()
    {


        $statement = DB::select("SHOW TABLE STATUS LIKE 'products'");
        $nextId = $statement[0]->Auto_increment;
        if($nextId==0)
        {
            $nextId=1;
        }
         return response()->json($nextId);
        
    }
    public function reportByDepartment(Request $request)
    {
        $fromDate=$request->fromDate;
         $todate=$request->todate;
      $stockvaluation = DB::select("select sum(`available_stock`*(opening_stock+(opening_stock*product_gst/100))) as sum, product_department,product_department_Name from products GROUP BY `product_department`");
       $stockvaluationForPurchase = DB::select("select sum(`pur_quanity`*(`pur_pro_opening`+(pur_pro_opening*products.product_gst/100))) as sum, product_department,product_department_Name from purchases join products on products.id=purchases.pur_pro_id  where DATE(pur_date) >= '$fromDate' and  DATE(pur_date) <= '$todate'  GROUP BY `product_department`");
      // $stockvaluationForPurchase = DB::select("select sum(`pur_quanity`*(`pur_pro_opening`)) as sum, pur_dep_code as product_department,pur_dep_name as product_department_Name from purchases where DATE(pur_date) >= '$fromDate' and  DATE(pur_date) <= '$todate'  GROUP BY `product_department`");
        // $stockvaluationForConsume = DB::select("select sum(`available_stock`*(product_uses.use_pro_opening+(product_uses.use_pro_opening*products.product_gst/100))) as sum, product_department,product_department_Name from product_uses join products on products.id=product_uses.use_pro_id  where DATE(use_date) > date($fromDate) and  DATE(use_date) < date($todate) GROUP BY `product_department`");
       $stockvaluationForConsume = DB::select("select sum(`use_quanity`*(product_uses.use_pro_opening+(product_uses.use_pro_opening*products.product_gst/100))) as sum, product_department,product_department_Name from product_uses join products on products.id=product_uses.use_pro_id  where DATE(use_date) >= '$fromDate' and  DATE(use_date) <= '$todate' GROUP BY `product_department`");
          

          // echo "select sum(`available_stock`*(`pur_pro_opening`+(pur_pro_opening*products.product_gst/100))) as sum, product_department,product_department_Name from purchases join products on products.id=purchases.pur_pro_id  where DATE(pur_date) > date($fromDate) and  DATE(pur_date) < date($todate)  GROUP BY `product_department`";
        $newArray=array();

        // foreach ($stockvaluation as $key => $value) {
        //    $newArray[$value->product_department]=$value->sum;
        // }
          // print_r($newArray);
          // $ResponseDetails = array_merge((array)$stockvaluation,(array)$stockvaluation);
          // print_r($ResponseDetails);
        $newArray['stockvaluation']=$stockvaluation;
         $newArray['stockvaluationForPurchase']=$stockvaluationForPurchase;
          $newArray['stockvaluationForConsume']=$stockvaluationForConsume;
        return response()->json($newArray);
    }
}