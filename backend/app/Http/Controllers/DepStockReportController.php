<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepStockReportRequest;
use App\DepStockReport;

class DepStockReportController extends Controller
{
    public function index()
    {
        $depstockreports = DepStockReport::latest()->get();

        return response()->json($depstockreports);
    }

    public function store(DepStockReportRequest $request)
    {
        $depstockreport = DepStockReport::create($request->all());

        return response()->json($depstockreport, 201);
    }

    public function show($id)
    {
        $depstockreport = DepStockReport::findOrFail($id);

        return response()->json($depstockreport);
    }

    public function update(DepStockReportRequest $request, $id)
    {
        $depstockreport = DepStockReport::findOrFail($id);
        $depstockreport->update($request->all());

        return response()->json($depstockreport, 200);
    }

    public function destroy($id)
    {
        DepStockReport::destroy($id);

        return response()->json(null, 204);
    }
}