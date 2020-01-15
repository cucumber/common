## Synopsis

**<a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-0-v1--homepage--pl--client/">becke.ch js regular expression library</a>**: 
A JavaScript Regular Expression library, extending the standard 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp">RegExp</a> 
class with missing functionality.<br>
A good description on JavaScript Regular Expression can be found 
<a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions">here (developer.mozilla.org)</a> 
and <a href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp">here (www.w3schools.com)</a>.<br>

<b><a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-0-v1--homepage--pl--client/doc/Regex.html">API Reference</a></b>

## Code Example

Convert plain text to html: Replace special characters (multiple spaces, tabs, ...) in plain text with their html "equivalent":

        //Convert plain text to html: Replace special characters (multiple spaces, tabs, ...) in plain text with their html "equivalent":
        var CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN = "( {2})|(\t)|(&)|(<)|(>)|(\n)";
        var CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN_REPLACE_STRING = [undefined, "&amp;nbsp;&amp;nbsp;", "&amp;emsp;", "&amp;amp;", "&amp;lt;", "&amp;gt;", "&lt;br&gt;"];
        
        var str = "3 spaces:'   ' followed by a tab:'\t' followed by an ampersand:'&' followed by less-than sign:'<' followed by greater-than sign:'>' followed by newline:'\n' and that's it";
        
        var regex = new Regex(CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN, 'g');
        var result = regex[Symbol.replace](str, CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN_REPLACE_STRING);
        //Alternative Syntax: For browsers supporting "Symbol": Chrome & Firefox
        var resultAlternative = str.replace(regex,CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN_REPLACE_STRING);
        console.log(result === "3 spaces:'&amp;nbsp;&amp;nbsp; ' followed by a tab:'&amp;emsp;' followed by an ampersand:'&amp;amp;' followed by less-than sign:'&amp;lt;' followed by greater-than sign:'&amp;gt;' followed by newline:'&lt;br&gt;' and that's it");


Retrieve content and position of: opening-, closing tags and body content for: non-nested html-tags.

        //Retrieve content and position of: opening-, closing tags and body content for: non-nested html-tags.
        var pattern = '(<([^ >]+)[^>]*>)([^<]*)(<\\/\\2>)';
        var str = '<html><code class="html plain">first</code><div class="content">second</div></html>';
        var regex = new Regex(pattern, 'g');
        var result = regex.exec(str);

        console.log(5 === result.length);
        console.log('<code class="html plain">first</code>'=== result[0]);
        console.log('<code class="html plain">'=== result[1]);
        console.log('first'=== result[3]);
        console.log('</code>'=== result[4]);
        console.log(5=== result.index.length);
        console.log(6=== result.index[0]);
        console.log(6=== result.index[1]);
        console.log(31=== result.index[3]);
        console.log(36=== result.index[4]);

        result = regex.exec(str);
        console.log(5=== result.length);
        console.log('<div class="content">second</div>'=== result[0]);
        console.log('<div class="content">'=== result[1]);
        console.log('second'=== result[3]);
        console.log('</div>'=== result[4]);
        console.log(5=== result.index.length);
        console.log(43=== result.index[0]);
        console.log(43=== result.index[1]);
        console.log(64=== result.index[3]);
        console.log(70=== result.index[4]);


## Motivation

**Regular Expression Group Based Search & Replace**: Main motivation was to find a solution for a regular expression 
group based search and replace. Instead of just providing a single replacement string for the entire match we can 
provide an array of replacement strings for each matching group. This method (string.replace(new Regex(pattern, 'g'),[undefined, replaceStringGroup1, ...])) 
smoothly extends the standard JavaScript replace functionality (string.replace(new RegExp(pattern, 'g'),replaceStringGroup0).

In addition to solve this problem the standard exec function of RegExp need to be extended to provide indexes for each
matching group which automatically provided a fix respective solution to the following problem: 
"<a href="http://stackoverflow.com/questions/1985594/how-to-find-indices-of-groups-in-javascript-regular-expressions-match">How to find indices of groups in JavaScript regular expressions match?</a>".<br>

## Installation

**HTML**: <a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-0-v1--homepage--pl--client/node_modules/becke-ch--regex--s0-0-v1--base--pl--lib/src/becke-ch--regex--s0-0-v1--base--pl--lib.js" target="_blank">becke.ch js regular expression library download</a><br><br>

	<html lang="en">
        <head>
            <script language="JavaScript" src="../src/becke-ch--regex--s0-0-v1--base--pl--lib.js" type="text/javascript"></script>
            ...
            <script language="JavaScript">
                <!--
        
                var pattern = '(<([^ >]+)[^>]*>)([^<]*)(<\\/\\2>)';
                var regex = new Regex(pattern, 'g');
                ...
        
                //-->
            </script>
        </head>
        <body>
            ...
        </body>
	</html>


**Node.js & NPM**: <a href="https://www.npmjs.com/package/becke-ch--regex--s0-0-v1--base--pl--lib" target="_blank">becke.ch js npm regular expression library download</a><br><br>
package.json

  "dependencies": {
    "becke-ch--regex--s0-0-v1--base--pl--lib": "latest"
  }

javascript:

    var Regex = require('becke-ch--regex--s0-0-v1--base--pl--lib');

    var pattern = '(<([^ >]+)[^>]*>)([^<]*)(<\\/\\2>)';
    var regex = new Regex(pattern, 'g');
    ...

**Angular 2 & Typescript**: <a href="https://www.npmjs.com/package/becke-ch--regex--s0-0-v1--base--pl--lib" target="_blank">becke.ch js npm regular expression library download</a><br><br>
package.json

  "dependencies": {
    "becke-ch--regex--s0-0-v1--base--pl--lib": "latest"
  }

Create typings file: src/app/custom.typings.d.ts:

    declare module 'Regex'

Import typings file into: src/main.ts:

    ///<reference path="./app/custom.typings.d.ts"/>
    
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    
    import { AppModule } from './app/app.module';
    
    platformBrowserDynamic().bootstrapModule(AppModule);

Map Declaration in: src/systemjs.config.js:

    (function (global) {
      System.config({
        paths: {
        ...
        },
        // map tells the System loader where to look for things
        map: {
          // private libraries
          'Regex': 'npm:becke-ch--regex--s0-0-v1--base--pl--lib/src/becke-ch--regex--s0-0-v1--base--pl--lib.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
        ...
        }
      });
    })(this);


typescript: src/app/app.component.ts: Important is to set the array-of-replacement-strings to type "any" otherwise the 
typescript will not compile because originally replace only supports one replacement string for the entire match and
not as we have it in this enhanced version an array of replacement strings for each matching group:

    import * as Regex from 'Regex';

    export class AppComponent {
        replaceClicked() {
            var str: string;
            var pattern: string;
            var flags: string;
            var replacementStringArray: any;
            
            //str.replace(new Regex(pattern, flags), replacementStringArray);
            (new Regex(pattern, flags))[Symbol.replace](str, replacementStringArray);
        }
    }



## API Reference

<a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-0-v1--homepage--pl--client/doc/Regex.html">The JSDoc can be found here</a>.

## Tests

<a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-0-v1--homepage--pl--client/">**You can test it live here!**</a>

OR

Once you've done the installation you can run (hundreds of) Unit (Mocha) tests with:

    npm test

OR alternatively

You can run these tests as follows:

    cd test
    ../node_modules/mocha/bin/mocha becke-ch--regex--s0-0-v1--base--pl--lib--test.js

## Changelog (Version History)

The changelog information can be found <a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/CHANGELOG.md">here</a>.

## License

<a href="http://www--s0-v1.becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-v1--license.txt">The (MIT style) License can be found here</a>
