function loadTasks(){
  console.log("I'm loading in ajax tasks");
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
  console.log(benificiaries_id);
  console.log(car_subscribers_id);
  console.log(habitation_subscribers_id);
}
