import 'dart:io';
import 'dart:convert';
import 'package:gherkin/messages.dart';

class MessageToNdjsonWriter implements IMessageWriter
{
  final IOSink _out;

  MessageToNdjsonWriter(this._out);

  @override
  void write(Object message) {
    final json = jsonEncode(message);
    _out.write(json);
    _out.write('\n');
    _out.flush();
  }
}
