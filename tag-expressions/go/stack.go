package tagexpressions

type Stack struct {
	elements []Evaluatble
}

// Return the number of items in the stack
func (s *Stack) Len() int {
	return len(t.elements)
}

// View the top item on the stack
func (s *Stack) Peek() interface{} {
	if s.Len() == 0 {
		return nil
	}
	return s.elements[s.Len()-1]
}

// Pop the top item of the stack and return it
func (s *Stack) Pop() interface{} {
	if s.Len() == 0 {
		return nil
	}
	value, s.elements := s.elements[s.Len()-1], s.elements[:s.Len()-1]
	return value
}

// Push a value onto the top of the stack
func (s *Stack) Push(value Evaluatble) {
	s.elements = appen(s.elements, value)
}
