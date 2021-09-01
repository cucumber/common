extension IntExtensions on int {
  bool get isMin => this == Int.min;
  bool get isNotMin => !isMin;
}

class Int {
  static const min = (1 << 63);
}