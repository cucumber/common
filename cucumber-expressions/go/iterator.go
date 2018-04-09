package cucumberexpressions

type InterfaceIterator struct {
	elements []interface{}
	index    int
}

func (i *InterfaceIterator) Next() interface{} {
	if i.index >= len(i.elements) {
		panic("cannot get next")
	}
	oldIndex := i.index
	i.index++
	return i.elements[oldIndex]
}

type IntIterator struct {
	iterator InterfaceIterator
}

func NewIntIterator(size int) *IntIterator {
	elements := make([]interface{}, size)
	for i := 0; i < size; i++ {
		elements[i] = i
	}
	return &IntIterator{
		iterator: InterfaceIterator{
			elements: elements,
		},
	}
}

func (s *IntIterator) Next() int {
	return s.iterator.Next().(int)
}
