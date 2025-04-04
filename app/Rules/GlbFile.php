<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class GlbFile implements ValidationRule
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

        // Verify the file extension is .glb
        if ($value->getClientOriginalExtension() !== 'glb') {
            $fail('The :attribute must be a .glb file.');
            return;
        }

        // Verify the file starts with "glTF"
        $fileContents = file_get_contents($value->getRealPath(), false, null, 0, 4);
        if ($fileContents !== "glTF") {
            $fail('The :attribute is not a valid .glb file.');
        }
    }
}
