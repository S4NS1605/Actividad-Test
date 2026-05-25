<?php

class StringHelper
{
    public static function truncate(string $text, int $maxLength, string $suffix = "..."): string
    {
        if ($maxLength <= 0) {
            throw new \InvalidArgumentException("El límite debe ser un número positivo.");
        }
        if (mb_strlen($text) <= $maxLength) {
            return $text;
        }
        return mb_substr($text, 0, $maxLength) . $suffix;
    }

    public static function toSlug(string $text): string
    {
        $slug = mb_strtolower($text);
        // Eliminar caracteres especiales
        $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
        // Reemplazar espacios múltiples por guión
        return preg_replace('/\s+/', '-', trim($slug));
    }

    public static function countWords(string $text): int
    {
        if (trim($text) === '') {
            return 0;
        }
        return str_word_count($text);
    }
}