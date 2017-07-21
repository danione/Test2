var quantity = 0;
var currentPage = 1; //current page we are at ( we are always begining at page 1)

// Hide and show with sliding effect
$(".option").click(function(event)
{
  event.stopPropagation();
  $(".obj2").toggleClass("slide");
});

// Check if we've clicked outside the obj2
$("body").click(function (clicker)
{
  if(clicker.target.className != 'obj2 slide')
    $(".obj2").removeClass("slide");
});

// Using a post function which will render the EJS
function updateOrAdd()
{
  $.post("generate",
  {
      quantity: quantity,
      dropdown: $(".dropdown").val()
  },
  function(data, status){
      // We send the quantity and the value of the dropdown and then we
      // replace with the new data
      $(".obj3").html(data);
      pagination();
  });
}

// Check if we have quantity
$( ".dropdown" ).change(function()
{
  if(quantity == 0)
    $("input").addClass('no-quantity');
  else
    updateOrAdd();
});

// When we write number, we generate html
$("input").keyup(function()
{
  currentPage = 1;
  $("input").removeClass('no-quantit');

  if($("input").val())
  {
    quantity = parseInt($("input").val());
    updateOrAdd();
  }
});

// Hide and show arrows for pagination and show current page
function pagination()
{
  if(quantity <= 3)
    $(".arrows").addClass('hidden');
  else
    $(".arrows").removeClass('hidden');
  $("." + currentPage.toString()).removeClass('hidden');
}

// Function when clicking forward arrow
$('body').on('click', '.forward', function()
{
  // We get max pages and we round it to the nearest integer downwads
  // since 1.33 we have 2 pages and 1.66 we still have 2 pages
  // we round it and add 1 so that we know when we will exceed the limit
  var maxLen = Math.floor(quantity / 3);
  if(quantity % 3 != 0)
    maxLen ++;
  if(currentPage + 1 <= maxLen) // if we are in the limits, we show the next page
  {                             // hiding the current page
    $("." + currentPage.toString()).addClass('hidden');
    currentPage++;
    pagination();
  }
});

// Function when clicking back arrow
$('body').on('click', '.back', function()
{
  // Check whether we aren't accessing the non-existent page 0
  if(currentPage - 1 >= 1)
  {
    $("." + currentPage.toString()).addClass('hidden');
    currentPage--;
    pagination();
  }
});
