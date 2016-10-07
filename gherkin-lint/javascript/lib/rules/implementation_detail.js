class ImplementionDetail {
  validate(warningEvents, path) {
    warningEvents.push({
      "type": "error",
      "source": {
        "uri": path,
        "start": {
          "line": 4,
          "column": 26
        }
      },
      "message": "Implementation detail: button"
    })
  }
}

export default ImplementionDetail