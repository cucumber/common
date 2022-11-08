using System.Collections.Generic;
using System.Linq;

namespace Gherkin.Ast
{
    public class Examples : IHasLocation, IHasDescription, IHasRows, IHasTags
    {
        public IEnumerable<Tag> Tags { get; private set; }
        public Location Location { get; private set; }
        public string Keyword { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public TableRow TableHeader { get; private set; }
        public IEnumerable<TableRow> TableBody { get; private set; }

        public Examples(Tag[] tags, Location location, string keyword, string name, string description, TableRow header, TableRow[] body)
        {
            Tags = tags;
            Location = location;
            Keyword = keyword;
            Name = name;
            Description = description;
            TableHeader = header;
            TableBody = body;
        }

        IEnumerable<TableRow> IHasRows.Rows
        {
            get { return new TableRow[] {TableHeader}.Concat(TableBody); }
        }
    }
}