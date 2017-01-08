@pushd %~dp0
set BERP_PATH=..\bin
%BERP_PATH%\berp.exe -g ..\gherkin.berp -t gherkin-csharp.razor -o Gherkin\Parser.cs
@popd