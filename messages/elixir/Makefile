default: .tested

.tested: .deps
	mix test

.deps: mix.lock
	touch $@

mix.lock: mix.exs
	mix deps.get

clean: 
	rm -rf _build deps .deps mix.lock

