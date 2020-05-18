package io.cucumber.createmeta;

import io.cucumber.messages.Messages;

public class CreateMeta {
  public  static Messages.Meta createMeta(
    String toolName,
    String toolVersion
  ) {
    return Messages.Meta.newBuilder()
      .setProtocolVersion(Messages.class.getPackage().getImplementationVersion())
      .setRuntime(Messages.Meta.Product.newBuilder()
              .setName(System.getProperty("java.vendor"))
              .setVersion(System.getProperty("java.version")))
      .setImplementation(Messages.Meta.Product.newBuilder()
              .setName(toolName)
              .setVersion(toolVersion))
      .setOs(Messages.Meta.Product.newBuilder()
              .setName(System.getProperty("os.name")))
      .setCpu(Messages.Meta.Product.newBuilder()
              .setName(System.getProperty("os.arch")))
      .build();
  }
}