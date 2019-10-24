<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavedCurrentStockRequest;
use App\SavedCurrentStock;

class SavedCurrentStockController extends Controller
{
    public function index()
    {
        $savedcurrentstocks = SavedCurrentStock::latest()->get();

        return response()->json($savedcurrentstocks);
    }

    public function store(SavedCurrentStockRequest $request)
    {
        $savedcurrentstock = SavedCurrentStock::create($request->all());

        return response()->json($savedcurrentstock, 201);
    }

    public function show($id)
    {
        $savedcurrentstock = SavedCurrentStock::findOrFail($id);

        return response()->json($savedcurrentstock);
    }

    public function update(SavedCurrentStockRequest $request, $id)
    {
        $savedcurrentstock = SavedCurrentStock::findOrFail($id);
        $savedcurrentstock->update($request->all());

        return response()->json($savedcurrentstock, 200);
    }

    public function destroy($id)
    {
        SavedCurrentStock::destroy($id);

        return response()->json(null, 204);
    }
    public function getSavedCurrentStock($id)
    {
         $savedcurrentstock = SavedCurrentStock::where("valuation_id",$id)->get();

        return response()->json($savedcurrentstock);
    }
}