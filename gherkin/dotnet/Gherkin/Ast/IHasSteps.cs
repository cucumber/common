using System.Collections.Generic;

namespace Gherkin.Ast
{
    public interface IHasSteps
    {
        IEnumerable<Step> Steps { get; }
    }
}