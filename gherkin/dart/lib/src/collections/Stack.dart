class Stack<T>
{

  final List<T> _list = <T>[];

  /// Check if the stack is empty.
  bool get isEmpty => _list.isEmpty;

  /// Check if the stack is not empty.
  bool get isNotEmpty => _list.isNotEmpty;

  /// Push element in top of the stack.
  void push(T value) => _list.insert(0, value);

  /// Get the top of the stack and delete it.
  T pop() =>
    _list.removeAt(0);

  // final ListQueue<T> _list;
  //
  // Stack([int initialCapacity])
  // : _list = ListQueue<T>(initialCapacity);
  //
  // /// Check if the stack is empty.
  // bool get isEmpty => _list.isEmpty;
  //
  // /// Check if the stack is not empty.
  // bool get isNotEmpty => _list.isNotEmpty;
  //
  // /// Push element in top of the stack.
  // void push(T value) => _list.addLast(value);
  //
  // /// Get the top of the stack and delete it.
  // T pop() => _list.removeLast();

  /// Get the top of the stack without deleting it.
  T get top => _list.first;

  void clear() => _list.clear();
}