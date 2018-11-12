
using System.Collections.Generic;
using System.Linq;
using Gherkin.Events.Args.Pickle;
using Gherkin.Pickles;
using Pickle = Gherkin.Pickles.Pickle;

namespace Gherkin.Stream
{
    public class PickleEventConverter
    {
        public Events.Args.Pickle.Pickle Convert(Pickle pickle, string sourceEventUri)
        {
            return new Events.Args.Pickle.Pickle()
            {
                Name = pickle.Name == string.Empty ? null : pickle.Name,
                Locations = pickle.Locations.Select(ConvertLocation).ToReadOnlyCollection(),
                Language = pickle.Language,
                Uri = sourceEventUri,
                Steps = ConvertSteps(pickle.Steps)
            };
        }

        private IReadOnlyCollection<Step> ConvertSteps(IEnumerable<PickleStep> pickleSteps)
        {
            return pickleSteps.Select(
                s => new Step()
                {
                    Text = s.Text,
                    Locations = s.Locations.Select(ConvertLocation).ToReadOnlyCollection(),
                    DataTable = ConvertDataTable(s.Arguments),
                    DocString = ConvertDocString(s.Arguments)

                }).ToReadOnlyCollection();
        }

        private DocString ConvertDocString(IEnumerable<Argument> arguments)
        {
            var pickleString = arguments.SingleOrDefault(a => a is PickleString) as PickleString;

            if (pickleString == null)
            {
                return null;
            }

            return new DocString()
            {
                Content = pickleString.Content,
                ContentType = pickleString.ContentType,
                Location = ConvertLocation(pickleString.Location)
            };

        }

        private DataTable ConvertDataTable(IEnumerable<Argument> arguments)
        {
            var pickleTable = arguments.SingleOrDefault(a => a is PickleTable) as PickleTable;

            if (pickleTable == null)
            {
                return null;
            }

            return new DataTable()
            {
                Rows = pickleTable.Rows.Select(r => new Row()
                {
                    Cells = r.Cells.Select(c => new Cell()
                    {
                        Location = ConvertLocation(c.Location),
                        Value = c.Value == string.Empty ? null : c.Value
                    }).ToReadOnlyCollection(),
                }).ToReadOnlyCollection()
            };

        }

        private Events.Args.Pickle.Location ConvertLocation(PickleLocation location)
        {
            return new Events.Args.Pickle.Location()
            {
                Column = location.Column,
                Line = location.Line
            };
        }
    }
}