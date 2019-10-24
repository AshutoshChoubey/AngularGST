<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveValuationRequest;
use App\SaveValuation;
use DB;

class SaveValuationController extends Controller
{
    public function index()
    {
        $savevaluations = SaveValuation::latest()->get();

        return response()->json($savevaluations);
    }

    public function store(SaveValuationRequest $request)
    {
        $savevaluation = SaveValuation::create($request->all());

        return response()->json($savevaluation, 201);
    }

    public function show($id)
    {
        $savevaluation = SaveValuation::findOrFail($id);

        return response()->json($savevaluation);
    }

    public function update(SaveValuationRequest $request, $id)
    {
        $savevaluation = SaveValuation::findOrFail($id);
        $savevaluation->update($request->all());

        return response()->json($savevaluation, 200);
    }

    public function destroy($id)
    {
        SaveValuation::destroy($id);

        return response()->json(null, 204);
    }
    public function getViewSavedStock($id){

        $dep_consume_reports= DB::table('dep_consume_reports');
        $dep_consume_reports->where('dep_consume_reports.deleted_at','=',null);
        $dep_consume_reports->where('dep_consume_reports.valuation_id','=',$id);
        $stockvaluationForConsume= $dep_consume_reports->get();

        $dep_stock_reports= DB::table('dep_stock_reports');
        $dep_stock_reports->where('dep_stock_reports.deleted_at','=',null);
        $dep_stock_reports->where('dep_stock_reports.valuation_id','=',$id);
        $stockvaluation= $dep_stock_reports->get();

        $dep_pur_reports= DB::table('dep_pur_reports');
        $dep_pur_reports->where('dep_pur_reports.deleted_at','=',null);
        $dep_pur_reports->where('dep_pur_reports.valuation_id','=',$id);
        $stockvaluationForPurchase= $dep_pur_reports->get();
        


        $newArray=array();
        $newArray['stockvaluation']=$stockvaluation;
        $newArray['stockvaluationForPurchase']=$stockvaluationForPurchase;
        $newArray['stockvaluationForConsume']=$stockvaluationForConsume;
        return response()->json($newArray);
    }
}