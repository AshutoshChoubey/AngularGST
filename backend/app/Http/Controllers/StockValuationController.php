<?php

namespace App\Http\Controllers;

use App\Http\Requests\StockValuationRequest;
use App\StockValuation;
use Illuminate\Http\Request;
use DB;

class StockValuationController extends Controller
{
    public function index()
    {
        $stockvaluations = StockValuation::latest()->get();

        return response()->json($stockvaluations);
    }

    public function store(StockValuationRequest $request)
    {
        $stockvaluation = StockValuation::create($request->all());

        return response()->json($stockvaluation, 201);
    }

    public function show($id)
    {
        $stockvaluation = StockValuation::findOrFail($id);

        return response()->json($stockvaluation);
    }

    public function update(StockValuationRequest $request, $id)
    {
        $stockvaluation = StockValuation::findOrFail($id);
        $stockvaluation->update($request->all());

        return response()->json($stockvaluation, 200);
    }

    public function destroy($id)
    {
        StockValuation::destroy($id);

        return response()->json(null, 204);
    }
    public function stockValuationReport()
    {
      $date = new \DateTime('NOW');
      $now=date_format($date,"Y-m-d");
      // $now->format('Y-m-d');
      $stockvaluation = DB::select("select Distinct products.id, products.*
        ,(select sum(purchases.pur_quanity) as Qnt from purchases where date(purchases.pur_date)=DATE('$now') and `purchases`.`pur_pro_id` = `products`.`id`) as add_stock,(select sum(product_uses.use_quanity) as Qnt from product_uses where date(product_uses.use_date)=DATE('$now') and `product_uses`.`use_pro_id` = `products`.`id`) as consume_stock from `products` left join `product_uses` on `product_uses`.`use_pro_id` = `products`.`id` left join `purchases` on `purchases`.`pur_pro_id` = `products`.`id`");
       return response()->json($stockvaluation);

    }
    public function stockValuationSearchedReport(Request $request)
    {
      $now=$request->fromDate;
       $departmentId=$request->departmentId;
        if(isset($departmentId))
        {
            $stockvaluation = DB::select("select Distinct products.id, products.*
                ,(select sum(purchases.pur_quanity) as Qnt from purchases where date(purchases.pur_date)=DATE('$now') and `purchases`.`pur_pro_id` = `products`.`id`) as add_stock,(select sum(product_uses.use_quanity) as Qnt from product_uses where date(product_uses.use_date)=DATE('$now') and `product_uses`.`use_pro_id` = `products`.`id`) as consume_stock from `products`  where `products`.`product_department` =$departmentId");
        }
        else
        {
           $stockvaluation = DB::select("select Distinct products.id, products.*
                ,(select sum(purchases.pur_quanity) as Qnt from purchases where date(purchases.pur_date)=DATE('$now') and `purchases`.`pur_pro_id` = `products`.`id`) as add_stock,(select sum(product_uses.use_quanity) as Qnt from product_uses where date(product_uses.use_date)=DATE('$now') and `product_uses`.`use_pro_id` = `products`.`id`) as consume_stock from `products` ");
        }
           return response()->json($stockvaluation);
    }
}