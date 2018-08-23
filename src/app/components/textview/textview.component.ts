import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Parser} from 'xml2js';

@Component({
  selector: 'app-textview',
  templateUrl: './textview.component.html',
  styleUrls: ['./textview.component.css']
})
export class TextviewComponent implements OnInit {

  private parser;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.parser = new Parser({explicitArray : false});
    this.http.get('./assets/wisski_test.xml', {responseType: 'text'})
      .subscribe(data => {
        this.parser.parseString(data, function (err, result) {
        
          // --------------------------------------------
          // --------------------------------------------
          // --------------------------------------------
          // mit for()-Schleife durh das JSON Objekt,
          // sodass es an die beispiel.json angepasst ist und die component/graphview (für d3) damit arbeiten kann          
          // --------------------------------------------
          // --------------------------------------------
          // --------------------------------------------
          
          // Konsole zeigt Objekte
          console.log(result["rdf:RDF"]["rdf:Description"]);          
          // var string_json = JSON.stringify(result); 
          // console.log(string_json);


          // --------------------------------------------
          // --------------------------------------------
          // --------------------------------------------

          // Neues JSON-Objekt -- für d3-Funktionen
          var beispiel_json = {"prefixes":[],"nodes":[],"links":[]};
          // 
          var prefix = {};
          var node = {};
          var link = {};
          // 
          console.log(beispiel_json);


          // --------------------------------------------
          // --------------------------------------------
          // --------------------------------------------
          
          // Inhalte aus 'result'-Objekt in d3_json_Format überführen
          // for() - Schleifen
          prefix["name"]='someValue';
          prefix["id"]= 0.1;
          beispiel_json.prefixes[0]=prefix;
          console.log(beispiel_json);
          // for (var i = 0; i < $scope.stocks.length; i++) {
          //   $scope.data[0].push($scope.stocks[i].percentage1)
          //   $scope.data[1].push($scope.stocks[i].percentage2)
          // }


          // --------------------------------------------
          // --------------------------------------------
          // --------------------------------------------

          // Download 
          // saveText( JSON.stringify(result), "filename.json" );

        }, function(err) {
          console.log(err);
        });
      });
  }
}


// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

// function downloadObjectAsJson(exportObj, exportName){
//   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
//   var downloadAnchorNode = document.createElement('a');
//   downloadAnchorNode.setAttribute("href",     dataStr);
//   downloadAnchorNode.setAttribute("download", exportName + ".json");
//   document.body.appendChild(downloadAnchorNode); // required for firefox
//   downloadAnchorNode.click();
//   downloadAnchorNode.remove();
// }