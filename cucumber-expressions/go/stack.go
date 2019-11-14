package cucumberexpressions

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

type GroupBuilderStack struct {
	interfaceStack InterfaceStack
}

func (s *GroupBuilderStack) Len() int {
	return s.interfaceStack.Len()
}

func (s *GroupBuilderStack) Peek() *GroupBuilder {
	return s.interfaceStack.Peek().(*GroupBuilder)
}

func (s *GroupBuilderStack) Pop() *GroupBuilder {
	return s.interfaceStack.Pop().(*GroupBuilder)
}

func (s *GroupBuilderStack) Push(value *GroupBuilder) {
	s.interfaceStack.Push(value)
}

type IntStack struct {
	interfaceStack InterfaceStack
}

func (s *IntStack) Len() int {
	return s.interfaceStack.Len()
}

func (s *IntStack) Peek() int {
	return s.interfaceStack.Peek().(int)
}

func (s *IntStack) Pop() int {
	return s.interfaceStack.Pop().(int)
}

func (s *IntStack) Push(value int) {
	s.interfaceStack.Push(value)
}
