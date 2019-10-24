<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
use App\Department;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::latest()->get();

        return response()->json($departments);
    }

    public function store(DepartmentRequest $request)
    {
        $department = Department::create($request->all());

        return response()->json($department, 201);
    }

    public function show($id)
    {
        $department = Department::findOrFail($id);

        return response()->json($department);
    }

    public function update(DepartmentRequest $request, $id)
    {
        $department = Department::findOrFail($id);
        $department->update($request->all());

        return response()->json($department, 200);
    }

    public function destroy($id)
    {
        Department::destroy($id);

        return response()->json(null, 204);
    }
}