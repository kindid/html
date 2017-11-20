///////////////////////////////////////////////////////////////////////////////
///(c) kuiash.com ltd 2017+ code@kuiash.com ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var html=require('../html');
/////////////////////////////////////////////////////////////////////////////////
const verbose = false
/////////////////////////////////////////////////////////////////////////////////
function html_test(title, xn, txt)
{
    if (verbose) {
        console.log("////// XML Tree (JSON)")
        console.log(JSON.stringify(x, null, 4))
        console.log("////// XML Rendered")
        console.log(xn.toString())
        console.log("////// Done")
    }
    console.log('test : ', title)
    try {
        let rendered = xn.toString()
        if (rendered !== txt) {
            throw('mismatch ' + rendered + ' !== ' + txt)
        } else {
            console.log('pass : ', title)
        }
    } catch(e) {
        console.log('fail : ', title, ' : ',  e.toString())
        console.trace()
        process.exit(-1)
    }
}
/////////////////////////////////////////////////////////////////////////////////
html_test(
    'Very simple web page (does not include !DOCTYPE wrapper)',
    html.html(
        html.head(
            html.title('A very simple web page')),
        html.body(
            html.h1('Welcome!!!'),
            html.p('It works!'),
            html.a({ href:'/index.html' }, 'To the top')
        )),
    '<html><head><title>A very simple web page</title></head><body><h1>Welcome!!!</h1><p>It works!</p><a href="/index.html">To the top</a></body></html>')
/////////////////////////////////////////////////////////////////////////////////
html_test(
    'Simple 2 div test',
    html.body(
        html.div(
            { id:'lefty', style: 'float:left; width:50%; border:1px solid blue;' },
            html.p('I\'m heading left...')
        ),
        html.div(
            { id:'lefty', style: 'margin-left:50%; width:50%; border:1px solid green;' },
            html.p('I\'m heading right...')
        )),
    '<body><div id="lefty" style="float:left; width:50%; border:1px solid blue;"><p>I&apos;m heading left...</p></div><div id="lefty" style="margin-left:50%; width:50%; border:1px solid green;"><p>I&apos;m heading right...</p></div></body>')
/////////////////////////////////////////////////////////////////////////////////
function make_person(first_name, last_name, computer_name, role)
{
    return {
        first_name: first_name,
        last_name: last_name,
        computer_name: computer_name,
        role: role }
}
let people = [
    make_person('Matthew', 'Kuiash', 'matthew-kuiash', 'MD'),
    make_person('Kitten', 'Whiskers', 'kitten', 'Cat'),
    make_person('Tess', 'Border-Collie', 'tess', 'Dog'),
    make_person('Bratislav', 'Wide-Trousers', 'flares', 'Minister of Information'),
    { first_name:'NoLastName', computer_name:'horse', role:'Agent Provocateur' }
]
/////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////
html_test(
    'Simple Javascript Object to HTML Table',
    html_table_from_js(
        people,
        [ 'first_name', 'last_name', 'computer_name', 'role']),
        '<table border="1"><thead><tr><th>first_name</th><th>last_name</th><th>computer_name</th><th>role</th></tr></thead><tbody><tr><td>Matthew</td><td>Kuiash</td><td>matthew-kuiash</td><td>MD</td></tr><tr><td>Kitten</td><td>Whiskers</td><td>kitten</td><td>Cat</td></tr><tr><td>Tess</td><td>Border-Collie</td><td>tess</td><td>Dog</td></tr><tr><td>Bratislav</td><td>Wide-Trousers</td><td>flares</td><td>Minister of Information</td></tr><tr><td>NoLastName</td><td></td><td>horse</td><td>Agent Provocateur</td></tr></tbody></table>')

process.exit(0)
