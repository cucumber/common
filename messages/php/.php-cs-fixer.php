<?php
$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/src',
        __DIR__ . '/src-generated',
        __DIR__ . '/tests',
    ])
;

$config = new PhpCsFixer\Config();
return $config->setFinder($finder);
