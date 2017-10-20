function javaStacktraceAttachmentEvent(uri, line) {
  return {
    "type": "attachment",
    "source": {
      "uri": uri,
      "start": {
        "line": line,
        "column": 1
      }
    },
    "data": "Exception in thread \"main\" java.lang.NullPointerException\n",
    "media": {
      "encoding": "utf-8",
      "type": "text/x.cucumber.stacktrace.java+plain"
    }
  }
}

function pngAttachmentEvent(uri, line) {
  return {
    "type": "attachment",
    "source": {
      "uri": uri,
      "start": {
        "line": line,
        "column": 1
      }
    },
    "data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAELUExURUdwTACoGAClFACqHACoFwCnGQCnFQCnGACoGQCoGQCoGACuGgCnFwCiFwCoGACoGACnFwClFgCpGACoFwD/AACnGAC2JACoGACnFwCqKgCoGACoGACqGQCoFwCnFwCoFwB/AACnGACoGAC/AACoGACoFgCmFwCnFwCnFwCqFgCmFgCZAACoGC64Ql3IbA2sJBuxMBiwLhewLR2yMgmrIOn36/z+/BGuJ9/04rHkuIDUjGHJcA6tJeD04wGoGQusIpnco+T257PlugSpHN704XDOfQeqHiCzNc7u0+z57t3z4HvSh7fmvj69UJzdpSi2PNjy3AKpGlrHahqxMBCtJpHZm83u0jS6R0vCXEWczDEAAAAsdFJOUwDIJQlYPSP7cFCqE1cW+mf4ImiBAXQHPu8GfP0zzoyOAp2wBOg4a2PqOU4FxgPjdgAAAK9JREFUGNNNj1UCwkAMRBcotLi7uw1S3N3d4f4nYSvIfO28bCYJIaI0OSabJ1+pFaDKpD4+zUJS1CHVWSwer+esDNhEQP+fV/f5uAd4XEIesNldl5WK0KSlQAtcDkc5xUcBA+y3tL/UKQIhCpLA+sTzw1K7UQVHQTyB23QyKraaNSAgTOGAQb9bqBeAoDg2EpMT4XdLm3rD8qrO7zFWO7UW8+86oodJp/zzRGUwyq83Mjcb8VXl0ZMAAAAASUVORK5CYII=",
    "media": {
      "encoding": "base64",
      "type": "image/png"
    }
  }
}

module.exports = {
  javaStacktraceAttachmentEvent,
  pngAttachmentEvent
}
