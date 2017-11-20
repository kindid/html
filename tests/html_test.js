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
process.exit(0)
