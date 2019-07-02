include default.mk

.generated: .fixprotoc

.fixprotoc:
ifdef ALPINE
	# The protoc bundled in the grpc.tools nuget package doesn't work on Alpine,
	# so we overwrite it with the one bundled inside the Docker image.
	# In order to prevent nuget from overwriting it again, we first build
	# once, allowing the build to fail, then doing the copy.
	-dotnet build -bl -c Release
	mkdir -p /root/.nuget/packages/grpc.tools/1.20.1/tools/linux_x64
	cp /usr/bin/protoc /root/.nuget/packages/grpc.tools/1.20.1/tools/linux_x64/protoc
endif
	touch $@

clean-dotnet:
	rm -f Cucumber.Messages/Messages.cs .fixprotoc
