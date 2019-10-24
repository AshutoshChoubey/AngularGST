<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarsRequest;
use App\Cars;

class CarsController extends Controller
{
    public function index()
    {
        $cars = Cars::latest()->get();

        return response()->json($cars);
    }

    public function store(CarsRequest $request)
    {
        $cars = Cars::create($request->all());

        return response()->json($cars, 201);
    }

    public function show($id)
    {
        $cars = Cars::findOrFail($id);

        return response()->json($cars);
    }

    public function update(CarsRequest $request, $id)
    {
        $cars = Cars::findOrFail($id);
        $cars->update($request->all());

        return response()->json($cars, 200);
    }

    public function destroy($id)
    {
        Cars::destroy($id);

        return response()->json(null, 204);
    }
}