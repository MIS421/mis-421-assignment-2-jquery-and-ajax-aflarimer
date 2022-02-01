var len;
var results = '';

  $(function() {
    // this initializes the dialog (and uses some common options that I do)
    $("#time").dialog({
      autoOpen : false
      // modal : true
      // show : "blind", hide : "blind"
    });
  
    // next add the onclick handler
    $("#timeButton").click(function() {
      $("#time").dialog("open");
      return false;
    });
  });

function changeBackground() {

  var images = ['./images/daniel-sessler-7YEB0RV6Qgw-unsplash.jpg','./images/nick-fewings-0bnjNA7PNp4-unsplash.jpg','./images/patrick-tomasso-5hvn-2WW6rY-unsplash.jpg','./images/tim-gouw-UU7H4SOwEho-unsplash.jpg'];
  document.body.style.backgroundImage = "url(" + images[Math.floor(Math.random() * images.length)] + ")";
}

function handleOnSearch() {
  apiSearch();
}

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://management.azure.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "e64bd68742594f67a12d1412bf3aee0a");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}