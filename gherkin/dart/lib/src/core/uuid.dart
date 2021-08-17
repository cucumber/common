/*import 'package:uuid/uuid.dart';
import 'INullSafetyObject.dart';

class uuid
    implements INullSafetyObject
{
  static const empty = _InvalidUuid();

  final Uuid _value;

  const uuid.parse(String value) :
    _value = Uuid.parse(value);

  @override
  bool get isEmpty => false;

  @override
  bool get isNotEmpty => !isEmpty;
}

class _InvalidUuid
    extends uuid
{
  const _InvalidUuid() : super.parse("");

  @override
  bool get isEmpty => true;

  @override
  bool get isNotEmpty => false;
}
*/