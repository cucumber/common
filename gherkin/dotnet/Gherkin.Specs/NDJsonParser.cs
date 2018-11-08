using System;
using System.Collections.Generic;
using Utf8Json;

namespace Gherkin.Specs
{
    public class NDJsonParser
    {
        public static List<T> Deserialize<T>(string ndjson)
        {
            var lines = ndjson.Split(new char[]{ '\n' }, StringSplitOptions.RemoveEmptyEntries);

            var result = new List<T>();

            foreach (var line in lines)
            {
                var deserializedObject = JsonSerializer.Deserialize<T>(line);
                result.Add(deserializedObject);
            }

            return result;
        }
    }
}