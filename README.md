# HTML generator built on top of kuiash/xml

The HTML library is just a layer on top of the [kuiash XML lbrary](https://github.com/kuiash/xml), it is mostly boiler plate expansion where the element name is wrapped into a module export e.g. instead of typing ```xml.el('p', 'this text')``` you can type ```html.p('this text')```.

The calls still return an XNode so it can be freely used with the XML library.

Some of the functions produce an "unclosed" XNode, others do not, this is specified below.

No special checking is performed on which entry is in which (you can put a font inside a table header - it really doesn't care)

### No tabs/spacing in Output

This is utterly deliberate - several HTML features will appear "buggy" to an end user if you put spacing in your HTML output files - for example li/ol/ul.

### !DOCTYPE

This is one of the more fundamentally annoying parts of the HTML/XML "spec" (there are others).

Use the XML library to wrap this up - The best way to organise you code is NOT to put this in every single place you need to generate HTML but place it in your own local module/function called "wrap_up_page" which you use just before you respond to the HTML request.

### Examples (taken from the unit tests)

#### Simple Web Page

```javascript
html.html(
    html.head(
        html.title('A very simple web page')),
    html.body(
        html.h1('Welcome!!!'),
        html.p('It works!'),
        html.a({ href:'/index.html' }, 'To the top')
    )).toString()
```
Results in... (Note, spacing is added afterwards. Actual output is compact - see above)
```html
<html>
    <head>
        <title>A very simple web page</title>
    </head>
    <body>
        <h1>Welcome!!!</h1>
        <p>It works!</p>
        <a href="/index.html">To the top</a>
    </body>
</html>
```

#### Make a Table

This function expect an array of objects and an array of column headings. There is nothing "pretty" about its output - human readable column names are left as a user exercise.

```javascript
function html_table_from_js(data, columns)
{
    return(
        html.table(
            { border:1 },
            html.thead(
                html.tr(
                    columns.map((column)=>
                        html.th(column)))),
            html.tbody(
                data.map((datum)=>
                    html.tr(
                        columns.map((column)=>
                            html.td(datum[column] || '')))))
        ))
}
```

### Special Calls

These functions do not map directly to an HTML element with the same name is the function name but provide some additional features

Function | XML Type | Parameters | Features
---------|----------|------------|---------
cssinc | Closed Element | url | Produces a link element with attribute of ```rel="stylesheet"``` and an href set to the incoming URL
jsinc | Closed Element | url | A Javascript include from the specified URL
jsraw | Closed Element | url | A raw Javascript code block
jsasd | Closed Element | url | A raw Javascript code block with the ```defer``` and ```async``` attributes

### Complete List of Entry Points

Function | XML Type |
---------|----------|
a | Closed Element
abbr | Closed Element
acronym | Closed Element
address | Closed Element
applet | Closed Element
area | Closed Element
article | Closed Element
aside | Closed Element
audio | Closed Element
b | Closed Element
base | Closed Element
basefont | Closed Element
bdi | Closed Element
bdo | Closed Element
big | Closed Element
blockquote | Closed Element
body | Closed Element
br | Closed Element
button | Closed Element
canvas | Closed Element
caption | Closed Element
center | Closed Element
cite | Closed Element
code | Closed Element
col | Closed Element
colgroup | Closed Element
datalist | Closed Element
dd | Closed Element
del | Closed Element
details | Closed Element
dfn | Closed Element
dialog | Closed Element
dir | Closed Element
div | Closed Element
dl | Closed Element
dt | Closed Element
em | Closed Element
embed | Closed Element
fieldset | Closed Element
figcaption | Closed Element
figure | Closed Element
font | Closed Element
footer | Closed Element
form | Closed Element
frame | Closed Element
frameset | Closed Element
h1 | Closed Element
h2 | Closed Element
h3 | Closed Element
h4 | Closed Element
head | Closed Element
header | Closed Element
hr | Closed Element
html | Closed Element
i | Closed Element
iframe | Closed Element
img | Closed Element
input | Closed Element
ins | Closed Element
kbd | Closed Element
keygen | Closed Element
label | Closed Element
legend | Closed Element
li | Closed Element
link | Unclosed Element
main | Closed Element
map | Closed Element
mark | Closed Element
menu | Closed Element
menuitem | Closed Element
meta | Unclosed Element
meter | Closed Element
nav | Closed Element
noframes | Closed Element
noscript | Closed Element
object | Closed Element
ol | Closed Element
optgroup | Closed Element
option | Closed Element
output | Closed Element
p | Closed Element
param | Closed Element
picture | Closed Element
pre | Closed Element
progress | Closed Element
q | Closed Element
rp | Closed Element
rt | Closed Element
ruby | Closed Element
s | Closed Element
samp | Closed Element
script | Closed Element
section | Closed Element
select | Closed Element
small | Closed Element
source | Closed Element
span | Closed Element
strike | Closed Element
strong | Closed Element
style | Closed Element
sub | Closed Element
summary | Closed Element
sup | Closed Element
table | Closed Element
tbody | Closed Element
td | Closed Element
textarea | Closed Element
tfoot | Closed Element
th | Closed Element
thead | Closed Element
time | Closed Element
title | Closed Element
tr | Closed Element
track | Closed Element
tt | Closed Element
u | Closed Element
ul | Closed Element
var | Closed Element
video | Closed Element
wbr | Closed Element
