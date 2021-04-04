using System;
using System.Reflection;
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