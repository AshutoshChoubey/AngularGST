<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Supplier;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::latest()->get();

        return response()->json($suppliers);
    }

    public function store(SupplierRequest $request)
    {
        $supplier = Supplier::create($request->all());

        return response()->json($supplier, 201);
    }

    public function show($id)
    {
        $supplier = Supplier::findOrFail($id);

        return response()->json($supplier);
    }

    public function update(SupplierRequest $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->update($request->all());

        return response()->json($supplier, 200);
    }

    public function destroy($id)
    {
        Supplier::destroy($id);

        return response()->json(null, 204);
    }
}