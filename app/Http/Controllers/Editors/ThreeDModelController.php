<?php

namespace App\Http\Controllers\Editors;

use App\Http\Controllers\Controller;

use App\Models\Format;
use App\Models\ThreeDModel;
use App\Rules\GlbFile;
use App\Rules\ModelFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThreeDModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('editors/three-d-models/Index', [
            'models' => ThreeDModel::with('format')->orderBy('updated_at', 'desc')->paginate(12),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('editors/three-d-models/Create', [
            'formats' => Format::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'format_id' => 'required|exists:formats,id',
            'poligons' => 'required|numeric|min:1',
            'textures' => 'required|boolean',
            'animations' => 'required|boolean',
            'rigged' => 'required|boolean',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'model_view' => ['required', new GlbFile()],
            'model_download' => ['required', new ModelFile()],
        ]);

        // Manejo centralizado de archivos
        $files = [
            'image' => [
                'path' => 'editors/three-d-models/images',
                'extension' => null,
                'field' => 'img_url',
            ],
            'model_view' => [
                'path' => 'editors/three-d-models/models',
                'extension' => 'glb',
                'field' => 'model_url',
            ],
            'model_download' => [
                'path' => 'editors/three-d-models/models',
                'extension' => 'fbx',
                'field' => 'download_url',
            ],
        ];

        foreach ($files as $input => $config) {
            if ($request->hasFile($input)) {
                $file = $request->file($input);
                $extension = $config['extension'] ?? $file->getClientOriginalExtension();
                $filename = uniqid('model_') . '.' . $extension;

                $path = $file->storeAs($config['path'], $filename);
                $validated[$config['field']] = $path;
            }
        }

        ThreeDModel::create($validated);

        return to_route('three-d-models.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(ThreeDModel $threeDModel)
    {
        return Inertia::render('editors/three-d-models/Show', [
            'model' => $threeDModel->load('format'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ThreeDModel $threeDModel)
    {
        return Inertia::render('editors/three-d-models/Edit', [
            'model' => $threeDModel->load('format'),
            'formats' => Format::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ThreeDModel $threeDModel)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'format_id' => 'required|exists:formats,id',
            'poligons' => 'required|numeric|min:1',
            'textures' => 'required|boolean',
            'animations' => 'required|boolean',
            'rigged' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'model_view' => ['nullable', new GlbFile()],
            'model_download' => ['nullable', new ModelFile()],
        ]);

        // Valores por defecto actuales
        $validated['img_url'] = $threeDModel->img_url;
        $validated['model_url'] = $threeDModel->model_url;
        $validated['download_url'] = $threeDModel->download_url;

        // Map de inputs de archivos
        $files = [
            'image' => [
                'old' => $threeDModel->img_url,
                'path' => 'editors/three-d-models/images',
                'extension' => null, //Get the extension from the file
                'field' => 'img_url',
            ],
            'model_view' => [
                'old' => $threeDModel->model_url,
                'path' => 'editors/three-d-models/models',
                'extension' => 'glb', // only accept .glb
                'field' => 'model_url',
            ],
            'model_download' => [
                'old' => $threeDModel->download_url,
                'path' => 'editors/three-d-models/models',
                'extension' => null,
                'field' => 'download_url',
            ],
        ];

        foreach ($files as $input => $config) {
            if ($request->hasFile($input)) {
                if (!empty($config['old'])) {
                    Storage::delete($config['old']);
                }

                $file = $request->file($input);
                $extension = $config['extension'] ?? $file->getClientOriginalExtension();
                $filename = uniqid('model_') . '.' . $extension;

                $path = $file->storeAs($config['path'], $filename);
                $validated[$config['field']] = $path;
            }
        }

        $threeDModel->update($validated);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ThreeDModel $threeDModel)
    {
        Storage::delete($threeDModel->img_url);
        Storage::delete($threeDModel->model_url);
        Storage::delete($threeDModel->download_url);
        $threeDModel->delete();
        return to_route('three-d-models.index');
    }
}
