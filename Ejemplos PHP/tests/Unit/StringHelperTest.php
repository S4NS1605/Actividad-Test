<?php

use PHPUnit\Framework\TestCase;

class StringHelperTest extends TestCase
{
    public function test_truncate_returns_same_text_if_short(): void
    {
        $this->assertEquals('Hola', StringHelper::truncate('Hola', 10));
    }

    public function test_truncate_cuts_and_adds_suffix(): void
    {
        $this->assertEquals('Desarrollo...', StringHelper::truncate('Desarrollo de Software', 10));
    }

    public function test_truncate_zero_length_throws_exception(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        StringHelper::truncate('Texto', 0);
    }

    public function test_to_slug_converts_properly(): void
    {
        $this->assertEquals('hola-mundo-2024', StringHelper::toSlug('¡Hola Mundo! 2024'));
    }

    public function test_count_words_returns_correct_number(): void
    {
        $this->assertEquals(3, StringHelper::countWords('Análisis y Desarrollo'));
    }

    public function test_count_words_returns_zero_on_empty_string(): void
    {
        $this->assertEquals(0, StringHelper::countWords('   '));
    }
}