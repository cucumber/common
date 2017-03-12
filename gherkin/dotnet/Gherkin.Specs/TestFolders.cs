using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Gherkin.Specs
{
    internal static class TestFolders
    {
        public static readonly string UniqueId = DateTime.Now.ToString("s", CultureInfo.InvariantCulture).Replace(":", "");

        public static string InputFolder
        {
            get 
            { 
                var inputFolder = Path.GetDirectoryName(new Uri(typeof(TestFolders).GetTypeInfo().Assembly.CodeBase).LocalPath);

                inputFolder = Path.Combine(inputFolder, "..");                

                return inputFolder; 
            }
        }

        public static string OutputFolder
        {
            //a simple solution that puts everyting to the output folder directly would look like this:
            //get { return Directory.GetCurrentDirectory(); }
            get
            {
                var outputFolder = Path.Combine(Directory.GetCurrentDirectory(), UniqueId);
                if (!Directory.Exists(outputFolder))
                    Directory.CreateDirectory(outputFolder);
                return outputFolder;
            }
        }

        public static string TempFolder
        {
            get { return Path.GetTempPath(); }
        }

        // very simple helper methods that can improve the test code readability

        public static string GetInputFilePath(string fileName)
        {
            return Path.GetFullPath(Path.Combine(InputFolder, fileName));
        }

        public static string GetOutputFilePath(string fileName)
        {
            return Path.GetFullPath(Path.Combine(OutputFolder, fileName));
        }

        public static string GetTempFilePath(string fileName)
        {
            return Path.GetFullPath(Path.Combine(TempFolder, fileName));
        }
    }
}
