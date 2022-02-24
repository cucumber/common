<?php

/**
 * Updates the dependency in the Composer repo (outputs unindented string)
 */

if ($argc !== 2) {
    echo 'Please provide a single JSON file path', "\n";
    exit(1);
}

$composerFile = $argv[1];

if(!$newVersion = getenv('NEW_VERSION')) {
    echo 'NEW_VERSION env var must be set', "\n";
    exit(1);
}

try {
    $json = json_decode(@file_get_contents($composerFile), true, flags: JSON_THROW_ON_ERROR);
}
catch (\Throwable $t)
{
    echo 'Could not read JSON from ', $composerFile, "\n";
    exit(1);
}

if (!isset($json['require']['cucumber/messages'])) {
    echo 'Provided JSON does not have a dependency on cucumber/messages', "\n";
    exit(1);
}

$dependencyString = $json['require']['cucumber/messages'];

if (!preg_match('/^(?<major>\\d+)\\.\\d+\\.\\d+$/', $newVersion, $matches)) {
    echo 'New version was not in the format XX.XX.XX', "\n";
    exit(1);
}

// like ^21.0 (same as >=21.0.0 <22.0.0)
$newDependency = '^'.$matches['major'].'.0';

if (str_contains($dependencyString, $newDependency)) {
    echo 'Nothing to update, already depends on ', $newDependency, "\n";
    exit(0);
}

$json['require']['cucumber/messages'] = $dependencyString . ',' . $newDependency;

echo json_encode($json);
