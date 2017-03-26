default: ../validator/yarn.lock Gemfile.lock test

Gemfile.lock: Gemfile
	bundle install

test:
	bundle exec rake
.PHONY: test

clean:
	rm Gemfile.lock
