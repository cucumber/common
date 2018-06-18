using System.Collections.Generic;

namespace Gherkin.Ast
{
    public interface IHasChildren
    {
        IEnumerable<IHasLocation> Children { get; }
    }
}