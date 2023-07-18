<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MetaTag;

class MetaTagController extends Controller
{
    public function index()
    {
        $metaTags = MetaTag::latest()->first();
        return response()->json($metaTags);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'metaTitle' => 'required|string',
            'metaDesc' => 'required|string',
            'twitchLink' => 'nullable|url',
            'teleLink' => 'required|url',
            'jsCode' => 'nullable|string',
        ]);

        $metaTags = MetaTag::first();

        if (!$metaTags) {
            // If no existing row, create a new one
            $metaTags = new MetaTag($validatedData);
            $metaTags->save();
        } else {
            // Update the values of the existing row
            $metaTags->update($validatedData);
        }

        return response()->json($metaTags);
    }
}
