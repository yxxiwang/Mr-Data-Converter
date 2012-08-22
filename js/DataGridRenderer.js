// 
//  DataGridRenderer.js
//  Part of Mr-Data-Converter
//  
//  Created by Shan Carter on 2010-10-18.
// 


var DataGridRenderer = {
  
  //---------------------------------------
  // Actionscript
  //---------------------------------------
  
  as: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "[";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loops
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += "{";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "null";
        } else {
          var rowOutput = '"'+( row[j] || "" )+'"';
        };      
        outputText += (headerNames[j] + ":" + rowOutput)
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += "];";
    
    
    return outputText;
  },
  
  
  //---------------------------------------
  // ASP / VBScript
  //---------------------------------------
  
  asp: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "'";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "null";
        } else {
          var rowOutput = '"'+( row[j] || "" )+'"';
        };
      outputText += 'myArray('+j+','+i+') = '+rowOutput+newLine;        
      };
    };
    outputText = 'Dim myArray('+(j-1)+','+(i-1)+')'+newLine+outputText;
    
    return outputText;
  },
  
  
  //---------------------------------------
  // HTML Table
  //---------------------------------------
  
  html: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    outputText += "<table>"+newLine;
    outputText += indent+"<thead>"+newLine;
    outputText += indent+indent+"<tr>"+newLine;
    
    for (var j=0; j < numColumns; j++) {
      outputText += indent+indent+indent+'<th class="'+headerNames[j]+'-cell">';          
      outputText += headerNames[j];
      outputText += '</th>'+newLine;
    };
    outputText += indent+indent+"</tr>"+newLine;
    outputText += indent+"</thead>"+newLine;
    outputText += indent+"<tbody>"+newLine;
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      var rowClassName = ""
      if (i === numRows-1) {
        rowClassName = ' class="lastRow"';
      } else if (i === 0){
        rowClassName = ' class="firstRow"';
      }
      outputText += indent+indent+"<tr"+rowClassName+">"+newLine;
      for (var j=0; j < numColumns; j++) {
        outputText += indent+indent+indent+'<td class="'+headerNames[j]+'-cell">';          
        outputText += row[j]
        outputText += '</td>'+newLine
      };
      outputText += indent+indent+"</tr>"+newLine;
    };
    outputText += indent+"</tbody>"+newLine;
    outputText += "</table>";
    
    return outputText;
  },
  
  
  //---------------------------------------
  // JSON properties
  //---------------------------------------
  
  json: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "[";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += "{";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "null";
        } else {
          var rowOutput = '"' + ( row[j] || "" ) + '"';
        };
  
      outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
  
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += "]";
    
    return outputText;
  },
  
  //---------------------------------------
  // JSON Array of Columns
  //---------------------------------------
  jsonArrayCols: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    outputText += "{"+newLine;
    for (var i=0; i < numColumns; i++) {
      outputText += indent+'"'+headerNames[i]+'":[';
      for (var j=0; j < numRows; j++) {
        if ((headerTypes[i] == "int")||(headerTypes[i] == "float")) {
          outputText += dataGrid[j][i] || 0;
        } else {
          outputText += '"'+(dataGrid[j][i] || "")+'"' ;
        }
        if (j < (numRows-1)) {outputText+=","};
      };
      outputText += "]";
      if (i < (numColumns-1)) {outputText += ","+newLine};
    };
    outputText += newLine+"}";
    
    
    return outputText;
  },
  
  
  //---------------------------------------
  // JSON Array of Rows
  //---------------------------------------
  jsonArrayRows: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    //begin render loop
    outputText += "["+newLine;
    for (var i=0; i < numRows; i++) {
      outputText += indent+"[";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          outputText += dataGrid[i][j] || 0;
        } else {
          outputText += '"'+(dataGrid[i][j] || "")+'"' ;
        }
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "]";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += newLine+"]";
    
    
    return outputText;
  },
  
  //---------------------------------------
  // Redis CMD of Rows
  //---------------------------------------
  redis_row: function (dataGrid, headerNames, headerTypes, indent, newLine) { 
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = " ";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      //outputText += "{";
      outputText += "hmset ";
      for (var j=0; j < numColumns; j++) { 
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          //var rowOutput = row[j] || "null";
          var rowOutput = $.trim(row[j]) || "null";
        } else {
          var rowOutput = '"' + ( row[j] || "" ) + '"' || "null";
        	if ($.trim(row[j]) == "" ) {rowOutput ="null"}; 
          //var rowOutput = row[j] || "null";
        };
  		
      	if (j == 0) {
      		outputText += (headerNames[j] + ":" + row[j] );
      	}else{
      		outputText += (headerNames[j] + " " + rowOutput );
  	  	} 
  	  	
        //if (j < (numColumns-1)) {outputText+=","};
        if (j < (numColumns-1)) {outputText+="  "};
      };
      //outputText += "}";
      //if (i < (numRows-1)) {outputText += ","+newLine};
      if (i < (numRows-1)) {outputText += "      "+newLine};
    };
    //outputText += "]";
    
    return outputText;
  },
  
  //---------------------------------------
  // Redis CMD of Columns
  //---------------------------------------
  redis_col: function (dataGrid, headerNames, headerTypes, indent, newLine) { 
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    
    for (var j=1; j < numColumns; j++) {
      outputText += "hmset ";  
      outputText += (headerNames[0] + ":" + headerNames[j] + "   "); 
      
      for (var i=0; i < numRows; i++) {
      	var row = dataGrid[i];
      	//var rowOutput = '"' + ( row[j] || "" ) + '"'; 
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = $.trim(row[j]) || "null";
        } else {
          var rowOutput = '"' + ( row[j] || "" ) + '"'; 
        	if ($.trim(row[j]) == "" || row[j] == null) { rowOutput ="null"}; 
        }
        
      		outputText += (row[0] + " " + rowOutput ); 
  	  	//break;
      		outputText += "  ";
      }
      //break;
      	if (j < (numColumns-1)) {outputText += "      "+newLine};
    } 
    return outputText;
  },
  //---------------------------------------
  // Redis CMD of Rows
  //---------------------------------------
  redis_mul_row: function (dataGrid, headerNames, headerTypes, indent, newLine) { 
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = " ";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    var arr = ["AUD","ATS","BEF","CAD","RMB","TWD","DKK","FIM","FRF","DEM","HKD","ITL","JPY","MOP","MYR","NLG","NZD","NOK","PHP","SGD","ESA","RKS","SEK","THB","GBP","USD","EUR","KRW","ESP","CHF"];
      
    var hCCY = "";
    //begin render loop
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      
      if (row[0] == ""){continue;}
 
      if($.inArray(row[0],arr) != "-1"){
          hCCY = row[0]+":";
          outputText += "      "+newLine
          continue;
      }
      
      outputText += "hmset ";
      /**/
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = $.trim(row[j]) || "null";
         } else {
          var rowOutput = '"' + ( row[j] || "" ) + '"' || "null";
        	if ($.trim(row[j]) == "" || row[j] == null) { rowOutput ="null"}; 
        } 
  		  
      	if (j == 0) {
      		outputText += (headerNames[j] + ":" + hCCY + row[j] );
      	}else{
      		outputText += (headerNames[j] + " " + rowOutput );
  	  	} 
  	  	
        //if (j < (numColumns-1)) {outputText+=","};
        if (j < (numColumns-1)) {outputText+="  "};
      };
      //outputText += "}";
      //if (i < (numRows-1)) {outputText += ","+newLine};
      if (i < (numRows-1)) {outputText += "      "+newLine};
    };
    //outputText += "]";
    
    return outputText;
  },
  
  //---------------------------------------
  // Redis CMD of Columns
  //---------------------------------------
  redis_mul_col: function (dataGrid, headerNames, headerTypes, indent, newLine) { 
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    var arr = ["AUD","ATS","BEF","CAD","RMB","TWD","DKK","FIM","FRF","DEM","HKD","ITL","JPY","MOP","MYR","NLG","NZD","NOK","PHP","SGD","ESA","RKS","SEK","THB","GBP","USD","EUR","KRW","ESP","CHF"];
    var hCCY = "";
    
    for (var j=1; j < numColumns; j++) {
      //outputText += "hmset ";  
      //key = (headerNames[0] + ":" + headerNames[j] + "   "); 
      //outputText += key; 
      
      for (var i=0; i < numRows; i++) {
      	var row = dataGrid[i];
      	if ($.trim(row[0]) == "" ){continue;}//��������
 
      	if($.inArray(row[0],arr) != "-1"){//���е�һ�������ڱ��������д���,��Ϊkey�ı�ͷ
          hCCY = row[0]+":";
          outputText += "      "+newLine
          outputText += "hmset ";  
      		key = (headerNames[0] + ":" + hCCY + headerNames[j] + "   "); 
      		outputText += key; 
          continue;
      	}
      	//var rowOutput = '"' + ( row[j] || "" ) + '"'; 
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = $.trim(row[j]) || "null";
        } else {
          var rowOutput = '"' + ( row[j] || "" ) + '"'; 
        	if ($.trim(row[j]) == "" || row[j] == null) { rowOutput ="null"}; 
        }
        
      		outputText += (row[0] + " " + rowOutput ); 
  	  	//break;
      		outputText += "  ";
      }
      //break;
      	if (j < (numColumns-1)) {outputText += "      "+newLine};
    } 
    return outputText;
  },  
  //---------------------------------------
  // MYSQL
  //---------------------------------------
  mysql: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "/*";
    var commentLineEnd = "*/";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    var tableName = "MrDataConverter"
    
    //begin render loop
    outputText += 'CREATE TABLE '+tableName+' (' + newLine;
    outputText += indent+"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"+newLine;
    for (var j=0; j < numColumns; j++) {
      var dataType = "VARCHAR(255)";
      if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
        dataType = headerTypes[j].toUpperCase();
      };
      outputText += indent+""+headerNames[j]+" "+dataType;
      if (j < numColumns - 1) {outputText += ","};
      outputText += newLine;
    };
    outputText += ');' + newLine;
    outputText += "INSERT INTO "+tableName+" "+newLine+indent+"(";
    for (var j=0; j < numColumns; j++) {
      outputText += headerNames[j];
      if (j < numColumns - 1) {outputText += ","};
    };
    outputText += ") "+newLine+"VALUES "+newLine;
    for (var i=0; i < numRows; i++) {
      outputText += indent+"(";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float"))  {
          outputText += dataGrid[i][j] || "null";
        } else {
          outputText += "'"+( dataGrid[i][j] || "" )+"'";
        };
        
        if (j < numColumns - 1) {outputText += ","};
      };
      outputText += ")";
      if (i < numRows - 1) {outputText += ","+newLine;};
    };
    outputText += ";";
    
    return outputText;
  },
  
  
  //---------------------------------------
  // PHP
  //---------------------------------------
  php: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    var tableName = "MrDataConverter"
    
    //begin render loop
    outputText += "array(" + newLine;
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += indent + "array(";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float"))  {
          var rowOutput = row[j] || "null";
        } else {
          var rowOutput = '"'+(row[j] || "")+'"';
        };          
        outputText += ('"'+headerNames[j]+'"' + "=>" + rowOutput)
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += ")";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += newLine + ");";
    
    return outputText;
  },
  
  //---------------------------------------
  // Python dict
  //---------------------------------------
  
  python: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "[";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += "{";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "None";
        } else {
          var rowOutput = '"'+(row[j] || "")+'"';
        };
  
      outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
  
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += "];";
    
    return outputText;
  },
  
  
  //---------------------------------------
  // Ruby
  //---------------------------------------
  ruby: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "#";
    var commentLineEnd = "";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    var tableName = "MrDataConverter"
    
    //begin render loop
    outputText += "[";
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += "{";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "nil"
        } else {
          var rowOutput = '"'+(row[j] || "")+'"';
        };         
        outputText += ('"'+headerNames[j]+'"' + "=>" + rowOutput)
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += "];";
    
    return outputText;
  },
  
  
  //---------------------------------------
  // XML Nodes
  //---------------------------------------
  xml: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
    outputText += "<rows>"+newLine;
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += indent+"<row>"+newLine;
      for (var j=0; j < numColumns; j++) {
        outputText += indent+indent+'<'+headerNames[j]+'>';          
        outputText += row[j] || ""
        outputText += '</'+headerNames[j]+'>'+newLine
      };
      outputText += indent+"</row>"+newLine;
    };
    outputText += "</rows>";
    
    return outputText;
    
  },
  
  
  
  //---------------------------------------
  // XML properties
  //---------------------------------------
  xmlProperties: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "<!--";
    var commentLineEnd = "-->";
    var outputText = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
  
    //begin render loop
    outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
    outputText += "<rows>"+newLine;
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += indent+"<row ";
      for (var j=0; j < numColumns; j++) {
        outputText += headerNames[j]+'=';          
        outputText += '"' + row[j] + '" ';
      };
      outputText += "></row>"+newLine;
    };
    outputText += "</rows>";
    
    return outputText;
    
  }
  
}