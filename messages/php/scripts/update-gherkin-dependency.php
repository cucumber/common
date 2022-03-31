<?php

/**
 * Updates the dependency in the Composer repo (outputs unindented string)
 */

if ($argc !== 2) {
    fwrite(STDERR, 'Please provide a single JSON file path' . "\n");
    exit(1);
}

$composerFile = $argv[1];

if(!$newVersion = getenv('NEW_VERSION')) {
    fwrite(STDERR, 'NEW_VERSION env var must be set' . "\n");
    exit(1);
}

try {
    $json = json_decode(@file_get_contents($composerFile), true, flags: JSON_THROW_ON_ERROR);
}
catch (\Throwable $t)
{
    fwrite(STDERR, 'Could not read JSON from ' . $composerFile . "\n");
    exit(1);
}

if (!isset($json['require']['cucumber/messages'])) {
    fwrite(STDERR, 'Provided JSON does not have a dependency on cucumber/messages' . "\n");
    exit(1);
}

$dependencyString = $json['require']['cucumber/messages'];

if (!preg_match('/^(?<major>\\d+)\\.\\d+\\.\\d+$/', $newVersion, $matches)) {
    fwrite(STDERR, 'New version was not in the format XX.XX.XX' . "\n");
    exit(1);
}

// like ^21.0 (same as >=21.0.0 <22.0.0)
$newDependency = '^'.$matches['major'].'.0';

if (str_contains($dependencyString, $newDependency)) {
    fwrite(STDERR, 'Nothing to update, already depends on ' . $newDependency . "\n");
    $newDependency = '';
}

// '||' is OR
$newDependencyString = $dependencyString . '||' .$newDependency;

$json['require']['cucumber/messages'] = $newDependencyString;

echo json_encode($json);
