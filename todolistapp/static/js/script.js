var update_list;
var create_list;
var delete_list;
$(document).ready(function() {
  update_list = function(id) {
    var id = id;
    var title = $("#title" + id).val();
    var description = $("#description" + id).val();
    var complete_by = $("#complete-by" + id).val();
    var status = "";
    var pending_el = document.getElementById("pending" + id);
    var in_progress_el = document.getElementById("in-progress" + id);
    var completed = document.getElementById("completed" + id);
    if (pending_el.checked) {
      status = 0;
    } else if (in_progress_el.checked) {
      status = 1;
    } else if (completed.checked) {
      status = 2;
    }

    var settings = {
      async: true,
      crossDomain: true,
      url: "/update_data",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      processData: false,
      data:
        '{"Id":"' +
        id +
        '","Title":"' +
        title +
        '","Description":"' +
        description +
        '","Complete_by":"' +
        complete_by +
        '","Status":"' +
        status +
        '"}'
    };
    console.log("data", settings.data);
    $.ajax(settings).done(function(response) {
      console.log(response);
      window.location.reload();
    });
  };

  create_list = function(id) {
    var title = $("#title" + id).val();
    var description = $("#description" + id).val();
    var complete_by = $("#complete-by" + id).val();

    var settings = {
      async: true,
      crossDomain: true,
      url: "/create_data",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      processData: false,
      data:
        '{"title":"' +
        title +
        '","description":"' +
        description +
        '","complete_by":"' +
        complete_by +
        '"}'
    };
    console.log("data", settings.data);
    $.ajax(settings).done(function(response) {
      console.log(response);
      window.location.reload();
    });
  };

  delete_list = function(id) {
    var settings = {
      async: true,
      crossDomain: true,
      url: "/delete_data",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      processData: false,
      data: '{"Id":"' + id + '"}'
    };
    console.log("data", settings.data);
    $.ajax(settings).done(function(response) {
      console.log(response);
      window.location.reload();
    });
  };

  var update_accordian = function(
    id,
    title,
    description,
    status,
    create_at,
    modified_at,
    complete_by
  ) {
    var pending = "",
      In_progress = "",
      Completed = "";
    if (status == "Pending") {
      pending = "checked";
    } else if (status == "In-progress") {
      In_progress = "checked";
    } else if (status == "Completed") {
      Completed = "checked";
    }

    console.log("pending", pending);
    console.log("In_progress", In_progress);
    console.log("Completed", Completed);

    var list_html =
      '<div style="border:1px solid black; margin-bottom: 1%;padding: 2%;background-color: white;color:black;padding:1%;font-size: large;" data-toggle="collapse" data-target="#' +
      id +
      '">' +
      title +
      "<span style=\"float:right;\"class=\"glyphicon glyphicon-chevron-down\"></span></div>\
            <div id=" +
      id +
      ' class="collapse">\
            <div class="form-group"> \
                <label for="title">Title:</label>\
                <textarea type="text" class="form-control" id="title' +
      id +
      '">' +
      title +
      '</textarea>\
            </div>\
            <div class="form-group"> \
                <label for="description">Description:</label>\
                <textarea type="text" class="form-control" id="description' +
      id +
      '">' +
      description +
      '</textarea>\
            </div>\
            <div class="form-group" id=radio-group>\
            <label for="radio-group"> Status: </label>\
            <div>\
            <input class="form-check-input" type="radio" name="abc' +
      id +
      '" id="pending' +
      id +
      '" value="pending" ' +
      pending +
      '> Pending\
            <input class="form-check-input" type="radio" name="abc' +
      id +
      '" id="in-progress' +
      id +
      '" value="in-progress" ' +
      In_progress +
      '> In Progress\
            <input class="form-check-input" type="radio" name="abc' +
      id +
      '" id="completed' +
      id +
      '" value="completed" ' +
      Completed +
      '> Completed\
            </div>\
            </div>\
            <div class="form-group">\
                <label for="Created-at">Created at:</label>\
                <input type="datetime-local" value=' +
      create_at +
      ' class="form-control" id="Created-at" disabled step="1">\
            </div>\
            <div class="form-group">\
                <label for="Modified-at">Modified at:</label>\
                <input type="datetime-local" value=' +
      modified_at +
      ' class="form-control" id="Modified-at" disabled step="1">\
            </div>\
            <div class="form-group">\
                <label for="Complete-by">Complete by:</label>\
                <input type="datetime-local" value=' +
      complete_by +
      ' class="form-control" id="complete-by' +
      id +
      '" step="1">\
            </div>\
            <div class="form-group">\
                <button type="button" class="btn btn-primary" id=' +
      id +
      ' onClick="update_list(this.id)">Update</button>\
                <button type="button" class="btn btn-danger" id=' +
      id +
      ' onClick="delete_list(this.id)">Delete</button>\
            </div>\
        </div>\
        </div>';
    return list_html;
  };

  var create_accordian = function(
    id,
    title,
    description,
    status,
    create_at,
    modified_at,
    complete_by
  ) {
    var pending = "",
      In_progress = "",
      Completed = "";
    if (status == "Pending") {
      pending = "checked";
    } else if (status == "In-progress") {
      In_progress = "checked";
    } else if (status == "Completed") {
      Completed = "checked";
    }

    console.log("pending", pending);
    console.log("In_progress", In_progress);
    console.log("Completed", Completed);

    var list_html =
      "\
            <div id=" +
      id +
      '>\
            <div class="form-group"> \
                <label for="title">Title:</label>\
                <textarea type="text" placeholder="enter title. ." class="form-control" id="title' +
      id +
      '">' +
      '</textarea>\
            </div>\
            <div class="form-group"> \
                <label for="description">Description:</label>\
                <textarea type="text" placeholder="enter description. ." class="form-control" id="description' +
      id +
      '">'  +
      '</textarea>\
            </div>\
            <div class="form-group">\
                <label for="Complete-by">Complete by:</label>\
                <input type="datetime-local" value=' +
      complete_by +
      ' class="form-control" id="complete-by' +
      id +
      '" step="1">\
            </div>\
            <div>\
                <button type="button" class="btn btn-primary" id=' +
      id +
      ' onClick="create_list(this.id)">Submit</button>\
      \
                <button type="button" class="btn btn-primary"\
            onClick="window.location.reload()">back</button>\
            </div>\
        </div>\
        </div>';
    return list_html;
  };

  var fetch = function() {
    var settings = {
      async: true,
      crossDomain: true,
      url: "/read_data",
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
      processData: false
    };

    $.ajax(settings).done(function(response) {
      var collapse_html = "";
      var staus_map = { "0": "Pending", "1": "In-progress", "2": "Completed" };
      for (var i = 0; i < response.length; i++) {
        id = response[i].id;
        title = response[i].Title;
        description = response[i].Description;
        status = response[i].Status;
        status = staus_map[status];
        create_at = response[i].Created_at;
        console.log(i, create_at);
        create_at = create_at.split("Z")[0];
        modified_at = response[i].Modified_at;
        modified_at = modified_at.split("Z")[0];
        complete_by = response[i].Complete_by;
        complete_by = complete_by.split("Z")[0];
        collapse_html =
          collapse_html +
          update_accordian(
            id,
            title,
            description,
            status,
            create_at,
            modified_at,
            complete_by
          );
      }
      $("#container").append(collapse_html);
    });
  };

  fetch();

  $("#create-btn").click(function() {
    var create_html = create_accordian(
      "r",
      "Enter title",
      "Enter Description",
      "Pending",
      "2019-07-20T13:28:04",
      "2019-07-20T13:28:04",
      "2019-07-20T13:28:04"
    );
    
    $("#container").hide();
    $("#create-div").html(create_html);
    $("#create-div").show();
    
  });
});
