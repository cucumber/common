namespace Gherkin.Events
{
  public static class IdGenerator
  {
    private static int counter = 0;

    public static string GetNextId()
    {
      var nextId = counter++;
      return nextId.ToString();
    }

    public static void Reset()
    {
        counter = 0;
    }

  }
}