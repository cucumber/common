package tagexpressions

import "sync"

type InterfaceStack struct {
	elements []interface{}
	locker   sync.Mutex
}

func (i *InterfaceStack) Len() int {
	i.locker.Lock()
	defer i.locker.Unlock()

	return len(i.elements)
}

func (i *InterfaceStack) Peek() interface{} {
	i.locker.Lock()
	defer i.locker.Unlock()

	length := len(i.elements)
	if length == 0 {
		panic("cannot peek")
	}

	return i.elements[length-1]
}

func (i *InterfaceStack) Pop() interface{} {
	i.locker.Lock()
	defer i.locker.Unlock()

	length := len(i.elements)
	if length == 0 {
		panic("cannot pop")
	}

	value := i.elements[length-1]
	i.elements = i.elements[:length-1]

	return value
}

func (i *InterfaceStack) Push(value interface{}) {
	i.locker.Lock()
	defer i.locker.Unlock()

	i.elements = append(i.elements, value)
}

type StringStack struct {
	interfaceStack InterfaceStack
}

func (s *StringStack) Len() int {
	return s.interfaceStack.Len()
}

func (s *StringStack) Peek() string {
	return s.interfaceStack.Peek().(string)
}

func (s *StringStack) Pop() string {
	return s.interfaceStack.Pop().(string)
}

func (s *StringStack) Push(value string) {
	s.interfaceStack.Push(value)
}

type EvaluatableStack struct {
	interfaceStack InterfaceStack
}

func (e *EvaluatableStack) Len() int {
	return e.interfaceStack.Len()
}

func (e *EvaluatableStack) Peek() Evaluatable {
	return e.interfaceStack.Peek().(Evaluatable)
}

func (e *EvaluatableStack) Pop() Evaluatable {
	return e.interfaceStack.Pop().(Evaluatable)
}

func (e *EvaluatableStack) Push(value Evaluatable) {
	e.interfaceStack.Push(value)
}
