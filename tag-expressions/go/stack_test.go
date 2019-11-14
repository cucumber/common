package tagexpressions

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestLen(t *testing.T) {
	cases := []struct {
		name     string
		given    []interface{}
		expected int
	}{
		{
			name:     "no elements",
			given:    []interface{}{},
			expected: 0,
		},
		{
			name:     "empty element",
			given:    nil,
			expected: 0,
		},
		{
			name:     "few elements",
			given:    []interface{}{1, 2, 3},
			expected: 3,
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			ss := StringStack{interfaceStack: InterfaceStack{elements: tc.given}}
			es := EvaluatableStack{interfaceStack: InterfaceStack{elements: tc.given}}

			require.Equal(t, tc.expected, ss.Len())
			require.Equal(t, tc.expected, es.Len())
		})
	}
}

func TestStringStackOperations(t *testing.T) {
	elements := []string{"a", "b", "c", "d", "e"}

	ss := StringStack{interfaceStack: InterfaceStack{elements: nil}}

	go func() {
		for _, v := range elements {
			ss.Push(v)
		}

		require.Equal(t, len(elements), ss.Len())
	}()

	go func() {
		for i := len(elements); i > 0; i-- {
			require.Equal(t, elements[i-1], ss.Peek())
			require.Equal(t, elements[i-1], ss.Pop())
			require.Equal(t, i-1, ss.Len())
		}

		require.Equal(t, 0, ss.Len())
		require.Panics(t, func() { ss.Peek() })
		require.Panics(t, func() { ss.Pop() })
	}()
}

func TestEvaluatableStackOperations(t *testing.T) {
	elements := []Evaluatable{
		&orExpr{
			leftExpr:  nil,
			rightExpr: nil,
		},
		&andExpr{
			leftExpr:  nil,
			rightExpr: nil,
		},
	}

	es := EvaluatableStack{interfaceStack: InterfaceStack{elements: nil}}

	go func() {
		for _, v := range elements {
			es.Push(v)
		}

		require.Equal(t, len(elements), es.Len())
	}()

	go func() {
		for i := len(elements); i > 0; i-- {
			require.Equal(t, elements[i-1], es.Peek())
			require.Equal(t, elements[i-1], es.Pop())
			require.Equal(t, i-1, es.Len())
		}

		require.Equal(t, 0, es.Len())
		require.Panics(t, func() { es.Peek() })
		require.Panics(t, func() { es.Pop() })
	}()
}
