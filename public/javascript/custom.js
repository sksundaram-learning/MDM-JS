var v360CustomerModel = {};
var idsToMerge = {
  benificiaries_id:[],
  car_subscribers_id : [] ,
  habitation_subscribers_id: []
}



var updateV360CustomerModel = function(data){
  Object.keys(data).forEach(function (element, index) {
    if(v360CustomerModel[element] == undefined){
      v360CustomerModel[element] = data[element];
    }else if(typeof v360CustomerModel[element] == 'object'){
      for(var i =0; i < data[element].length; i++){
        v360CustomerModel[element].push(data[element][i]);
      }
    }
  });

  $("#mergeForm").empty();
  var stringToAdd = '';
  Object.keys(v360CustomerModel).forEach(function (element, index) {
    var valueToPrint = v360CustomerModel[element];
    stringToAdd += `
        <div class="form-group">
          <label for="`+element+`">`+element+`</label>
        `;
    if(typeof valueToPrint == 'object'){
      stringToAdd += '<textarea id="'+element+'" class="form-control" rows="3" name='+element+'>'+JSON.stringify(valueToPrint)+'</textarea>';
    }else{
      stringToAdd += '<input id="'+element+'" type="text" class="form-control" placeholder="'+element+'" value="'+valueToPrint+'">';
    }
    stringToAdd += '</div>';
  });

  stringToAdd += '<button type="submit" class="btn btn-default">Merge</button>';


  $("#mergeForm").append(stringToAdd);

}

function loadTasks(){
  $.get( "/tools/tasksBucket", function( data ) {
    for(var i = 0; i < data.length; i++){
      var benificiaries_id = data[i].benificiaries_id;
      var car_subscribers_id = data[i].car_subscribers_id;
      var habitation_subscribers_id = data[i].habitation_subscribers_id;

      var stringToAdd ='<div class="row">';
      stringToAdd += '<div id= "task'+ i+'" class="thumbnail">';
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
  idsToMerge.benificiaries_id = benificiaries_id;
  idsToMerge.car_subscribers_id = car_subscribers_id;
  idsToMerge.habitation_subscribers_id = habitation_subscribers_id;

  for(var i = 0; i < benificiaries_id.length; i++){
    $.get( "/benificiaries/" + benificiaries_id[i], function( data ) {
      addReadOnlyForm(data);
      updateV360CustomerModel(data);
    });
  }
  for(var i = 0; i < car_subscribers_id.length; i++){
    $.get( "/car_subscribers/" + car_subscribers_id[i], function( data ) {
      addReadOnlyForm(data);
      updateV360CustomerModel(data);
    });
  }
  for(var i = 0; i < habitation_subscribers_id.length; i++){
    $.get( "/habitation_subscribers/" + habitation_subscribers_id[i], function( data ) {
      addReadOnlyForm(data);
      updateV360CustomerModel(data);
    });
  }
}

function addReadOnlyForm(values){
  var divColumn = $('<div class="col-md-3">');
  var formToAdd = $('<form>');
  Object.keys(values).forEach(function (element, index) {
    var valueToPrint = values[element];
    var formGroup = $('<div class="form-group">');
    formGroup.append('<label for="'+element+'">'+element+'</label>');
    if(typeof valueToPrint == 'object'){
      formGroup.append('<textarea disabled class="form-control" rows="3" name='+element+'>'+JSON.stringify(valueToPrint)+'</textarea>');
    }else{
      formGroup.append('<input disabled type="text" class="form-control" placeholder="'+element+'" value="'+valueToPrint+'">');
    }

    formToAdd.append(formGroup);
  });

  formToAdd.click(loadInfoInV360Form.bind(null, values));

  divColumn.append(formToAdd);
  $("#formsToMerge").append(divColumn);
}

var loadInfoInV360Form = function(data){
  Object.keys(data).forEach(function (element, index) {
    v360CustomerModel[element] = data[element];
  });

  updateV360CustomerModel(data);
}

var mergeCustomers = function(event){
  event.preventDefault();
  console.log("I should submit");

  return false;
}
