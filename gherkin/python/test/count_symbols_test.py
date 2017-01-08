# coding=utf-8

from nose.tools import assert_equals
from gherkin.count_symbols import count_symbols

def test_count_length_of_astral_point_symbols_correctly():
    string = u'\U0001f63b'
    assert_equals(1, count_symbols(string))

def test_count_length_of_ascii_symbols_correctly():
    string = u'hello'
    assert_equals(5, count_symbols(string))

def test_count_length_of_latin_symbols_correctly():
    string = u'Scénario'
    assert_equals(8, count_symbols(string))
