<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $languages = Language::all();

        return response()->json($languages);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate(Language::rules());

        $language = Language::create($validatedData);

        return response()->json($language, 201);
    }

    public function show($id)
    {
        $language = Language::find($id);

        if (!$language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        return response()->json($language);
    }

    public function update(Request $request, $id)
    {
        $Language = Language::find($id);

        if (!$Language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $validatedData = $request->validate(Language::rules());

        $Language->update($validatedData);

        return response()->json($Language);
    }

    public function destroy($id)
    {
        $Language = Language::find($id);

        if (!$Language) {
            return response()->json(['message' => 'Language not found'], 404);
        }

        $Language->delete();

        return response()->json(['message' => 'Language deleted successfully']);
    }
}
