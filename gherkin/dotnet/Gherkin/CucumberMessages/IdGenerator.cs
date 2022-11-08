using System;

namespace Gherkin.CucumberMessages
{
    public interface IIdGenerator
    {
        string GetNewId();
    }

    public class GuidIdGenerator : IIdGenerator
    {
        public string GetNewId()
        {
            return Guid.NewGuid().ToString("N");
        }
    }

    public class IncrementingIdGenerator : IIdGenerator
    {
        private int _counter = 0;
        
        public string GetNewId()
        {
            var nextId = _counter++;
            return nextId.ToString();
        }

        public void Reset()
        {
            _counter = 0;
        }
    }
}