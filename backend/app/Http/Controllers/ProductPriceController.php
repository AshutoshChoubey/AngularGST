<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductPriceRequest;
use App\ProductPrice;

class ProductPriceController extends Controller
{
    public function index()
    {
        $productprices = ProductPrice::latest()->get();

        return response()->json($productprices);
    }

    public function store(ProductPriceRequest $request)
    {
        $productprice = ProductPrice::create($request->all());

        return response()->json($productprice, 201);
    }

    public function show($id)
    {
        $productprice = ProductPrice::findOrFail($id);

        return response()->json($productprice);
    }

    public function update(ProductPriceRequest $request, $id)
    {
        $productprice = ProductPrice::findOrFail($id);
        $productprice->update($request->all());

        return response()->json($productprice, 200);
    }

    public function destroy($id)
    {
        ProductPrice::destroy($id);

        return response()->json(null, 204);
    }
}