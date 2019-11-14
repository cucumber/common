package cucumberexpressions

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

			ss := GroupBuilderStack{interfaceStack: InterfaceStack{elements: tc.given}}
			es := IntStack{interfaceStack: InterfaceStack{elements: tc.given}}

			require.Equal(t, tc.expected, ss.Len())
			require.Equal(t, tc.expected, es.Len())
		})
	}
}

func TestStackOperations(t *testing.T) {
	elements := []*GroupBuilder{{capturing: true}, {capturing: false}}

	ss := GroupBuilderStack{interfaceStack: InterfaceStack{elements: nil}}

	go func() {
		for _, v := range elements {
			ss.Push(v)
		}

		require.Equal(t, len(elements), ss.Len())
	}()

	go func() {
		for i := len(elements); i > 0; i-- {
			require.Equal(t, elements[i-1].capturing, ss.Peek().capturing)
			require.Equal(t, elements[i-1].capturing, ss.Pop().capturing)
			require.Equal(t, i-1, ss.Len())
		}

		require.Equal(t, 0, ss.Len())
		require.Panics(t, func() { ss.Peek() })
		require.Panics(t, func() { ss.Pop() })
	}()
}

func TestIntStackOperations(t *testing.T) {
	elements := []int{1, 2, 3, 4, 5}

	ss := IntStack{interfaceStack: InterfaceStack{elements: nil}}

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
