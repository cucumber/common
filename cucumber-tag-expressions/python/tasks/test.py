# -*- coding: UTF-8 -*-
"""
Invoke test tasks.
"""

from __future__ import print_function
import os.path
import sys
from invoke import task, Collection

# -- TASK-LIBRARY:
from ._tasklet_cleanup import cleanup_tasks, cleanup_dirs, cleanup_files


# ---------------------------------------------------------------------------
# TASKS
# ---------------------------------------------------------------------------
@task(name="all", help={
    "args": "Command line args for test run.",
})
def test_all(ctx, args="", options=""):
    """Run all tests (default)."""
    pytest(ctx, args, options=options)


@task
def clean(ctx, dry_run=False):
    """Cleanup (temporary) test artifacts."""
    directories = ctx.test.clean.directories or []
    files = ctx.test.clean.files or []
    cleanup_dirs(directories, dry_run=dry_run)
    cleanup_files(files, dry_run=dry_run)


@task
def pytest(ctx, args="", options=""):
    """Run unit tests."""
    args = args or ctx.pytest.args
    options = options or ctx.pytest.options
    ctx.run("pytest {options} {args}".format(options=options, args=args))


@task(help={
    "args":     "Tests to run (empty: all)",
    "report":   "Coverage report format to use (report, html, xml)",
})
def coverage(ctx, args="", report="report", append=False):
    """Determine test coverage (run pytest, behave)"""
    append = append or ctx.coverage.append
    report_formats = ctx.coverage.report_formats or []
    if report not in report_formats:
        report_formats.insert(0, report)
    opts = []
    if append:
        opts.append("--append")

    pytest_args = args
    if isinstance(pytest_args, list):
        pytest_args = " ".join(pytest_args)

    # -- RUN TESTS WITH COVERAGE:
    ctx.run("coverage run {options} -m pytest {args}".format(
            args=pytest_args, options=" ".join(opts)))

    # -- POST-PROCESSING:
    ctx.run("coverage combine")
    for report_format in report_formats:
        ctx.run("coverage {report_format}".format(report_format=report_format))


# ---------------------------------------------------------------------------
# TASK MANAGEMENT / CONFIGURATION
# ---------------------------------------------------------------------------
namespace = Collection(clean, pytest, coverage)
namespace.add_task(test_all, default=True)
namespace.configure({
    "test": {
        "clean": {
            "directories": [
                ".cache", "assets",                         # -- TEST RUNS
            ],
            "files": [
                ".coverage", ".coverage.*",
                "report.html",
            ],
        },
    },
    "pytest": {
        "scopes":   ["tests"],
        "args":   "",
        "options": "",  # -- NOTE:  Overide in configfile "invoke.yaml"
    },
    "coverage": {
        "append":   False,
        "report_formats": ["report", "html"],
    },
})

# -- ADD CLEANUP TASK:
cleanup_tasks.add_task(clean, "clean_test")
cleanup_tasks.configure(namespace.configuration())
