/**
 * 这是一个模块的注释
 * @Author   Timothy    CHEN
 * @DateTime 2018-12-19
 * @todo
 * @param    {String}   con  [description]
 * @return   {Promise}        [description]
 */
function generateHtml(con) {
  var html = `
		<!DOCTYPE html>
		<html lang='en'>
		<head>
			<title></title>
			<meta charset="utf-8"></meta>
			<style>
		    table {
	        border-collapse: collapse;
	        margin: 8px 76px;
	        width: calc(100% - 152px);
	        border: 4px solid #e0e0e0;
	        border-style: double;
	        font-size: 12px;
		    }
				td, th {
	        border: 1px solid #e0e0e0;
	        padding: 6px 4px;
	        min-width: 5em;
	        min-height: 24px;
		    }
		    tr:first-child td {
	        font-weight: 800;
	        font-size: 14px;
	        color: #212121;
	        background: #fafafa;
		    }
			</style>
		</head>
		<body>${con}</body>
		</html>`

  return html
}

module.exports = generateHtml