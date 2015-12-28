function loadTasks(){
  $.get( "/tools/tasksBucket", function( data ) {
    for(var i = 0; i < data.length; i++){
      var benificiaries_id = data[i].benificiaries_id;
      var car_subscribers_id = data[i].car_subscribers_id;
      var habitation_subscribers_id = data[i].habitation_subscribers_id;

      var stringToAdd ='<div class="row"><div id= "task'+ i+'" class="thumbnail">';
      stringToAdd +='benificiaries : '+ benificiaries_id.length +'</br>';
      stringToAdd +='car subscribers : '+ car_subscribers_id.length +'</br>';
      stringToAdd +='habitation subscribers : '+ habitation_subscribers_id.length +'</br>';
      stringToAdd +='</div></div>';

      $("#tasksBucket").append(stringToAdd);
      $("#task"+i).click(loadSpecificTask.bind(null,benificiaries_id, car_subscribers_id, habitation_subscribers_id));
    }
  });
}

function loadSpecificTask(benificiaries_id, car_subscribers_id, habitation_subscribers_id){
  console.log("Je suis censé lancer une requete AJAX");
  $.get( "/benificiaries/" + benificiaries_id[0], function( data ) {
    console.log(data);
    addReadOnlyForm("/benificiaries/" + benificiaries_id[0], data);
  });
}

function addReadOnlyForm(url, values){
  var stringToAdd = '<form action="'+url+'" method="PUT">';
  Object.keys(values).forEach(function (element, index) {
    stringToAdd = `
        <div class="form-group">
          <label for="`+element+`">`+element+`</label>
          <input enabled="false" type="text" class="form-control" id="`+element+`" placeholder="`+element+`" value="`+values[element]+`">
        </div>
    `;
  });

  stringToAdd += '<button type="submit" class="btn btn-default">Submit</button></form>';
  $("#formsToMerge").append(stringToAdd);
}
