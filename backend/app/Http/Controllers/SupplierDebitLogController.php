<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierDebitLogRequest;
use App\SupplierDebitLog;

class SupplierDebitLogController extends Controller
{
    public function index()
    {
        $supplierdebitlogs = SupplierDebitLog::latest()->get();

        return response()->json($supplierdebitlogs);
    }

    public function store(SupplierDebitLogRequest $request)
    {
        $supplierdebitlog = SupplierDebitLog::create($request->all());

        return response()->json($supplierdebitlog, 201);
    }

    public function show($id)
    {
        $supplierdebitlog = SupplierDebitLog::findOrFail($id);

        return response()->json($supplierdebitlog);
    }

    public function update(SupplierDebitLogRequest $request, $id)
    {
        $supplierdebitlog = SupplierDebitLog::findOrFail($id);
        $supplierdebitlog->update($request->all());

        return response()->json($supplierdebitlog, 200);
    }

    public function destroy($id)
    {
        SupplierDebitLog::destroy($id);

        return response()->json(null, 204);
    }
}