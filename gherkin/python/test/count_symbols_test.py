# coding=utf-8

from gherkin.count_symbols import count_symbols


def test_count_length_of_astral_point_symbols_correctly():
    string = u'\U0001f63b'
    assert 1 == count_symbols(string)


def test_count_length_of_ascii_symbols_correctly():
    string = u'hello'
    assert 5 == count_symbols(string)


def test_count_length_of_latin_symbols_correctly():
    string = u'Scénario'
    assert 8, count_symbols(string)
