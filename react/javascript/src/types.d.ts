// This iss taken from: https://github.com/rburns/ansi-to-html/blob/master/src/ansi_to_html.d.ts
// Apparently, using npm-install does not pull the declaration file.

declare module 'ansi-to-html' {
  interface ConverterOptions {
    /** The default foreground color used when reset color codes are encountered. */
    fg?: string
    /** The default background color used when reset color codes are encountered. */
    bg?: string
    /** Convert newline characters to `<br/>`. */
    newline?: boolean
    /** Generate HTML/XML entities. */
    escapeXML?: boolean
    /** Save style state across invocations of `toHtml()`. */
    stream?: boolean
    /** Can override specific colors or the entire ANSI palette. */
    colors?: string[] | { [code: number]: string }
  }

  class Convert {
    constructor(options?: ConverterOptions)
    toHtml(data: string): string
  }

  export = Convert
}
