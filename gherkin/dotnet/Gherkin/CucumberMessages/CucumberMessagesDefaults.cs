namespace Gherkin.CucumberMessages
{
    public static class CucumberMessagesDefaults
    {
        public const string DefaultDescription = "";
        public const string DefaultName = "";
        public const string DefaultCellValue = "";
        public const string DefaultSourceData = "";

        public static string UseDefault(string value, string defaultValue)
        {
            return string.IsNullOrEmpty(value) ? defaultValue : value;
        }
    }
}
