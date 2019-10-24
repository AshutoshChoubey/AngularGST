<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepConsumeReportRequest;
use App\DepConsumeReport;

class DepConsumeReportController extends Controller
{
    public function index()
    {
        $depconsumereports = DepConsumeReport::latest()->get();

        return response()->json($depconsumereports);
    }

    public function store(DepConsumeReportRequest $request)
    {
        $depconsumereport = DepConsumeReport::create($request->all());

        return response()->json($depconsumereport, 201);
    }

    public function show($id)
    {
        $depconsumereport = DepConsumeReport::findOrFail($id);

        return response()->json($depconsumereport);
    }

    public function update(DepConsumeReportRequest $request, $id)
    {
        $depconsumereport = DepConsumeReport::findOrFail($id);
        $depconsumereport->update($request->all());

        return response()->json($depconsumereport, 200);
    }

    public function destroy($id)
    {
        DepConsumeReport::destroy($id);

        return response()->json(null, 204);
    }
}