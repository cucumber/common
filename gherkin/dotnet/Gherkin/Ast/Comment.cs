namespace Gherkin.Ast
{
    public class Comment : IHasLocation
    {
        public Location Location { get; private set; }
        public string Text { get; private set; }

        public Comment(Location location, string text)
        {
            Text = text;
            Location = location;
        }
    }
}