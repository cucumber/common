using System;
using System.IO;
using System.Reflection;

namespace Gherkin.Specs.Helper
{
    internal static class TestFolders
    {
        public static string InputFolder
        {
            get 
            { 
                var inputFolder = Path.GetDirectoryName(new Uri(typeof(TestFolders).GetTypeInfo().Assembly.CodeBase).LocalPath);

                inputFolder = Path.Combine(inputFolder, "..");                

                return inputFolder; 
            }
        }
    }
}
