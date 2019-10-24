<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequisitionDetailRequest;
use App\RequisitionDetail;

class RequisitionDetailController extends Controller
{
    public function index()
    {
        $requisitiondetails = RequisitionDetail::latest()->get();

        return response()->json($requisitiondetails);
    }

    public function store(RequisitionDetailRequest $request)
    {
        $requisitiondetail = RequisitionDetail::create($request->all());

        return response()->json($requisitiondetail, 201);
    }

    public function show($id)
    {
        $requisitiondetail = RequisitionDetail::findOrFail($id);

        return response()->json($requisitiondetail);
    }

    public function update(RequisitionDetailRequest $request, $id)
    {
        $requisitiondetail = RequisitionDetail::findOrFail($id);
        $requisitiondetail->update($request->all());

        return response()->json($requisitiondetail, 200);
    }

    public function destroy($id)
    {
        RequisitionDetail::destroy($id);

        return response()->json(null, 204);
    }
}