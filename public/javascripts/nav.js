document.getElementById('toggleButton').addEventListener('click', function () {
    var dropdown = document.getElementById('myDropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('#toggleButton')) {
        var dropdown = document.getElementById('myDropdown');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
};


gsap.to('nav', {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.4)',

    scrollTrigger: {
        trigger: 'nav',
        scroller: 'body',
        // markers: true,
        start: '100% 0%',
        end: '100% -20%',
        scrub: 2,
    }

})

// develop

document.addEventListener("DOMContentLoaded", function () {
    var dropdownBtn = document.getElementById("dropdownBtn");
    var dropdownContent = document.getElementById("myDropdown1");
  
    dropdownBtn.addEventListener("click", function () {
      dropdownContent.classList.toggle("show");
    });
  
    window.addEventListener("click", function (event) {
      if (!event.target.matches("#dropdownBtn")) {
        if (dropdownContent.classList.contains("show")) {
          dropdownContent.classList.remove("show");
        }
      }
    });
  });
  
// resources

document.addEventListener("DOMContentLoaded", function () {
  var dropdownBtn = document.getElementById("dropdownBtn2");
  var dropdownContent = document.getElementById("myDropdown2");

  dropdownBtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches("#dropdownBtn2")) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  });
});