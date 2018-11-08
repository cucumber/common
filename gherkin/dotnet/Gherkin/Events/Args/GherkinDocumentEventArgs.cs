using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Gherkin.Events.Args
{
    public class GherkinDocumentEventArgs
    {
        public GherkinDocumentEventArgs()
        {
            Comments = new List<Comment>();
        }

        [DataMember(Name = "feature")]
        public Feature Feature { get; set; }
        [DataMember(Name = "uri")]
        public string Uri { get; set; }
        [DataMember(Name = "comments")]
        public IReadOnlyCollection<Comment> Comments { get; set; }
    }

    public class Comment
    {
        [DataMember(Name="text")]
        public string Text { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }

    public class Feature
    {
        public Feature()
        {
            Children = new List<Children>();
        }

        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "language")]
        public string Language { get; set; }
        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "children")]
        public IReadOnlyCollection<Children> Children { get; set; }
    }

    public class Location
    {
        public Location(int column, int line)
        {
            Column = column;
            Line = line;
        }

        public Location()
        {
        }

        [DataMember(Name = "column")]
        public int Column { get; set; }
        [DataMember(Name = "line")]
        public int Line { get; set; }
    }

    public class Children
    {
        [DataMember(Name = "background")]
        public StepsContainer Background { get; set; }
        [DataMember(Name = "scenario")]
        public StepsContainer Scenario { get; set; }

        [DataMember(Name = "rule")]
        public Rule Rule { get; set; }

        
    }

    public class Rule
    {
        public Rule()
        {
            Children = new List<Children>();
        }

        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "children")]
        public IReadOnlyCollection<Children> Children { get; set; }
    }

    public class StepsContainer
    {
        public StepsContainer()
        {
            Steps = new List<Step>();
            Examples = new List<Examples>();
        }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "steps")]
        public IReadOnlyCollection<Step> Steps { get; set; }

        [DataMember(Name = "examples")]
        public IReadOnlyCollection<Examples> Examples { get; set; }
    }


    public class Examples
    {
        public Examples()
        {
            TableBody = new List<TableBody>();
        }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "tableBody")]
        public IReadOnlyCollection<TableBody> TableBody { get; set; }

        [DataMember(Name = "tableHeader")]
        public TableHeader TableHeader { get; set; }
    }

    public class TableBody
    {
        [DataMember(Name = "cells")]
        public IReadOnlyCollection<Cell> Cells { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }

    public class TableHeader
    {
        [DataMember(Name = "cells")]
        public IReadOnlyCollection<Cell> Cells { get; set; }

        [DataMember(Name = "location")]
        public Location Location { get; set; }
    }

    public class Cell
    {
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "value")]
        public string Value { get; set; }
    }

    public class Step
    {
        [DataMember(Name = "keyword")]
        public string Keyword { get; set; }
        [DataMember(Name = "location")]
        public Location Location { get; set; }
        [DataMember(Name = "text")]
        public string Text { get; set; }
    }
}