package io.cucumber.datatable;

class TablePrinterBuilder {
    private String startIndent;
    private Boolean escapeCells;

    public TablePrinter build() {
      return new TablePrinter(startIndent, escapeCells);
    }

    public TablePrinterBuilder indent(String startIndent) {
      this.startIndent = startIndent;
      return this;
    }

    public TablePrinterBuilder escapeCells(Boolean escapeCells) {
      this.escapeCells = escapeCells;
      return this;
    }
}
