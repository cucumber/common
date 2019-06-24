package cucumberexpressions

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestTreeRegexp(t *testing.T) {
	t.Run("exposes group source", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("(a(?:b)?)(c)"))
		var gbSources []string
		for _, gb := range tr.GroupBuilder().Children() {
			gbSources = append(gbSources, gb.Source())
		}
		require.Equal(t, gbSources, []string{"a(?:b)?", "c"})
	})

	t.Run("builds tree, ignoring non-capturing groups", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("(a(?:b)?)(c)"))
		group := tr.Match("ac")
		require.Equal(t, *group.Value(), "ac")
		require.Equal(t, *group.Children()[0].Value(), "a")
		require.Empty(t, group.Children()[0].Children())
		require.Equal(t, *group.Children()[1].Value(), "c")
	})

	t.Run("ignores `?:` as a non-capturing group", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("a(?:b)(c)"))
		group := tr.Match("abc")
		require.Equal(t, *group.Value(), "abc")
		require.Len(t, group.Children(), 1)
	})

	t.Run("matches optional group", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("^Something( with an optional argument)?"))
		group := tr.Match("Something")
		require.Nil(t, group.Children()[0].Value())
	})

	t.Run("matches nested groups", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile(`^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))`))
		group := tr.Match("A 5 thick line from 10,20,30 to 40,50,60")
		require.Equal(t, *group.Children()[0].Value(), "5")
		require.Equal(t, *group.Children()[1].Value(), "10,20,30")
		require.Equal(t, *group.Children()[1].Children()[0].Value(), "10")
		require.Equal(t, *group.Children()[1].Children()[1].Value(), "20")
		require.Equal(t, *group.Children()[1].Children()[2].Value(), "30")
		require.Equal(t, *group.Children()[2].Value(), "40,50,60")
		require.Equal(t, *group.Children()[2].Children()[0].Value(), "40")
		require.Equal(t, *group.Children()[2].Children()[1].Value(), "50")
		require.Equal(t, *group.Children()[2].Children()[2].Value(), "60")
	})

	t.Run("detects multiple non capturing groups", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile(`(?:a)(:b)(\?c)(d)`))
		group := tr.Match("a:b?cd")
		require.Len(t, group.Children(), 3)
	})

	t.Run("works with escaped backslash", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile(`foo\\(bar|baz)`))
		group := tr.Match("foo\\bar")
		require.Len(t, group.Children(), 1)
	})

	t.Run("works with escaped slash", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile(`I go to '/(.+)'$`))
		group := tr.Match("I go to '/hello'")
		require.Len(t, group.Children(), 1)
	})

	t.Run("works with digit and word", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile(`^(\d) (\w+)$`))
		group := tr.Match("2 you")
		require.Len(t, group.Children(), 2)
	})

	t.Run("captures non capturing groups with capturing groups inside", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile(`the stdout(?: from "(.*?)")?`))
		group := tr.Match("the stdout")
		require.Equal(t, *group.Value(), "the stdout")
		require.Nil(t, group.Children()[0].Value())
		require.Len(t, group.Children(), 1)
	})

	t.Run("does not consider parenthesis in character class as group", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("^drawings: ([A-Z, ()]+)$"))
		group := tr.Match("drawings: ONE(TWO)")
		require.Equal(t, *group.Value(), "drawings: ONE(TWO)")
		require.Len(t, group.Children(), 1)
		require.Equal(t, *group.Children()[0].Value(), "ONE(TWO)")
	})

	t.Run("works with flags", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("(?i)HELLO"))
		var gbSources []string
		for _, gb := range tr.GroupBuilder().Children() {
			gbSources = append(gbSources, gb.Source())
		}
		require.Empty(t, gbSources)
		group := tr.Match("hello")
		require.Equal(t, *group.Value(), "hello")
	})

	t.Run("works with disabled flags", func(t *testing.T) {
		tr := NewTreeRegexp(regexp.MustCompile("(?i)HELL(?-i:O)"))
		var gbSources []string
		for _, gb := range tr.GroupBuilder().Children() {
			gbSources = append(gbSources, gb.Source())
		}
		require.Empty(t, gbSources)
		group := tr.Match("hello")
		require.Nil(t, group)
		group = tr.Match("hellO")
		require.Equal(t, *group.Value(), "hellO")
	})
}
