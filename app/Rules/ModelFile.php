<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ModelFile implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$value instanceof UploadedFile) {
            $fail('The :attribute must be a valid file.');
            return;
        }

        $validExtensions = ['fbx', 'obj'];
        $extension = strtolower($value->getClientOriginalExtension());

        if (!in_array($extension, $validExtensions)) {
            $fail('The :attribute must be a file of type: .fbx or .obj.');
            return;
        }
    }
}
