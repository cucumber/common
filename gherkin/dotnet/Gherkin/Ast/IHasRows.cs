using System.Collections.Generic;

namespace Gherkin.Ast
{
    public interface IHasRows
    {
        IEnumerable<TableRow> Rows { get; }
    }
}