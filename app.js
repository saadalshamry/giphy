var topics = [
  "the godfather",
  "the notebook",
  "shawshank redemption",
  "dark knight"
];

function renderBtns() {
  $(topics).each(function(index, e) {
    console.log(e);
    var btn = $('<button class="btn btn-warning m-2">');
    btn.text(e);
    $(".btn-container").append(btn);
  });
}

renderBtns();
var key = "dyYkAf6aH4LNEYf1v5t5EaRDye8kxAn9";
$("#add").on("click", function() {
  topics.push($("#add-topic").val());
  $(".btn-container").html("");
  renderBtns();
  $("#add-topic").val("");
});

// ajax

$(document).on("click", ".btn-warning", function() {
  var url =
    "https://api.giphy.com/v1/gifs/search?q=" +
    $(this).text() +
    "&api_key=" +
    key +
    "&limit=10";
  $.ajax({
    url: url
  }).then(function(res) {
    res.data.forEach(function(e) {
      var div = $('<div class="col col-lg-12 border border-info p-1">');

      console.log(e);
      var rating = $("<h6>");
      var title = $("<h6>");
      var download = $("<a>");
      rating.text("Rating: " + e.rating);
      title.text("Title: " + e.title);
      var img = $("<img>");
      img.attr("data-still", e.images.downsized_still.url);
      img.attr("data-animate", e.images.downsized.url);
      img.attr("state", "still");
      img.attr("src", e.images.downsized_still.url);
      download.attr("href", e.images.downsized.url);
      download.attr("download");
      download.text("Download");
      div.append(rating);
      div.append(title);
      div.append(img);
      div.append(download);
      $("#result").append(div);
    });
  });
});

//animating gifs
$(document).on("click", "img", function() {
  if ($(this).attr("state") == "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("state", "still");
  }
});
