<?php

/**
 * Utility to split the generated classes into separate class files
 */

$messages = file_get_contents(__DIR__ . '/build/messages.php');

$namespaces = preg_split('/(^namespace\s+.*$)/m', $messages, flags: PREG_SPLIT_DELIM_CAPTURE);

// anything before the first namespace should be repeated in all files
$frontmatter = array_shift($namespaces);

/*
 * preg_split with PREG_SPLIT_DELIM_CAPTURE will return [block?, delimiter, block, delim ..]
 * It makes sense to chunk this up in pairs using array_chunk and then destructure them inside the loop
 */
foreach(array_chunk($namespaces, 2) as [$namespace, $namespaceCode]) {
    $classes = preg_split(
            '#^// CLASS_START (.*)$#m',
            $namespaceCode,
            flags: PREG_SPLIT_DELIM_CAPTURE
    );

    // anything before the first class should be repeated in all class files
    $namespaceFrontmatter = array_shift($classes);

    foreach(array_chunk($classes, 2) as [$filename, $code]) {

        $fileContents = $frontmatter.$namespace.$namespaceFrontmatter.rtrim($code)."\n";

        if (preg_match('#(?<dir>^.*)/.*#', $filename, $matches)) {
            mkdir(__DIR__.'/src-generated/'.$matches['dir'], recursive: true);
        }

        file_put_contents(__DIR__ .'/src-generated/'.$filename, $fileContents);

        echo "Written ".__DIR__ .'/src-generated/'.$filename."\n";
    }
}
