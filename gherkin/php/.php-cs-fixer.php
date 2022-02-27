<?php
$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/src',
        __DIR__ . '/src-generated',
        __DIR__ . '/tests',
        __DIR__ . '/bin',
    ])
;

$rules = [
    'trailing_comma_in_multiline' => [
        'after_heredoc' => true,
        'elements' => [
            'arrays',
            'arguments',
            'parameters',
        ],
    ],
];

$config = new PhpCsFixer\Config();
return $config->setRules([...$config->getRules(),...$rules])->setFinder($finder);
