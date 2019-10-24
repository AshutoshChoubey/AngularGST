<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndentRequest;
use App\Indent;
use DB;

class IndentController extends Controller
{
    public function index()
    {
        $indents = Indent::latest()->get();

        return response()->json($indents);
    }

    public function store(IndentRequest $request)
    {
        $indent = Indent::create($request->all());

        return response()->json($indent, 201);
    }

    public function show($id)
    {
        $indent = Indent::findOrFail($id);

        return response()->json($indent);
    }

    public function update(IndentRequest $request, $id)
    {
        $indent = Indent::findOrFail($id);
        $indent->update($request->all());

        return response()->json($indent, 200);
    }

    public function destroy($id)
    {
        Indent::destroy($id);

        return response()->json(null, 204);
    }
    public function indentDelete()
    {

    }
    
}