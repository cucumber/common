from gherkin.dialect import Dialect


class TestDialect:
    def test_provides_an_interface_to_the_keywords_of_a_dialect(self):
        dialect_en = Dialect.for_name("en")
        assert dialect_en.feature_keywords == ["Feature", "Business Need", "Ability"]