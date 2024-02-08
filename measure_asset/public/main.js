const json2html = require("node-json2html")
let json = require("./db.json")
const fs = require('fs')

json2html.component.add('link', {
    "<>": "a",
    "text": "${id}",
    "href": "http://192.168.1.203:8080/measures/${id}"
})

let html = json2html.render(json.measures, {
    "<>": "tr",
    'html': [{
            "<>": "td",
            "html": [
                { "[]": 'link' }
            ]
        },
        { "<>": "td", "html": "${k}" },
        { "<>": "td", "html": "${n}" },
        { "<>": "td", "html": "${v}" },
        { "<>": "td", "html": "${u}" },
        { "<>": "td", "html": "${s}" },
        { "<>": "td", "html": "${g}" },
    ]
})

var template = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        section {
            margin: 24px auto;
            max-width: 1024px;
        }
        
        table {
            width: 100%;
        }
        
        td {
            padding: 4px 8px;
        }
    </style>
</head>

<body>
    <section>
        <table border="1">
                ${html}
        </table>
    </section>
</body>

</html>
`

fs.writeFileSync("./test2.html", template, 'utf-8')