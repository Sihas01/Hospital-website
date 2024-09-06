
// Get the button
  let topBtn = document.getElementById("top-btn");
        
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("mySidenav").style.padding = "10px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
    document.getElementById("mySidenav").style.padding = "0";
    
  }