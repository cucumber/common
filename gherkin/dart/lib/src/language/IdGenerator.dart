import 'package:uuid/uuid.dart';

abstract class IdGenerator
{
  String newId();

  static final IdGenerator incrementingGenerator = Incrementing();

  static final IdGenerator uuidGenerator = UUID();
}

class UUID implements IdGenerator
{
  final Uuid _uuid = Uuid();

  @override
  String newId() => _uuid.v1();
}

class Incrementing implements IdGenerator
{
  int _next = 0;

  @override
  String newId() {
      _next++;
      return _next.toString();
  }
}

