using System;
using Gherkin.Ast;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Gherkin.CLI
{
    class FeatureAstJSonContractResolver : CamelCasePropertyNamesContractResolver
    {
        public override JsonContract ResolveContract(Type type)
        {
            var contract = base.ResolveContract(type);

            //TODO: introduce Node base type and filter for that here
            if (typeof(IHasLocation).IsAssignableFrom(type))
            {
                var objContract = (JsonObjectContract) contract;
                if (!objContract.Properties.Contains("type"))
                    objContract.Properties.AddProperty(new JsonProperty()
                    {
                        PropertyName = "type",
                        ValueProvider = new GetTypeValueProvider(),
                        PropertyType = typeof(string),
                        Readable = true
                    });
            }
            if (typeof(GherkinDocument).IsAssignableFrom(type))
            {
                var objContract = (JsonObjectContract) contract;
                if (!objContract.Properties.Contains("type"))
                    objContract.Properties.AddProperty(new JsonProperty()
                    {
                        PropertyName = "type",
                        ValueProvider = new GetTypeValueProvider(),
                        PropertyType = typeof(string),
                        Readable = true
                    });
            }

            return contract;
        }

        internal class GetTypeValueProvider : IValueProvider
        {
            public void SetValue(object target, object value)
            {
                throw new NotSupportedException();
            }

            public object GetValue(object target)
            {
                return target.GetType().Name;
            }
        }

        protected override JsonConverter ResolveContractConverter(Type objectType)
        {
            var defaultConverter = base.ResolveContractConverter(objectType);
            return defaultConverter;
        }
    }
}