(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Hero test run: each check runs, then passes, one after another.
  var card = document.getElementById("runCard");
  var total = document.getElementById("runTotal");
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-run]"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setState(li, cls, label) {
    li.classList.remove("running", "pass");
    if (cls) li.classList.add(cls);
    li.querySelector(".run-state").textContent = label;
  }
  function finish() {
    items.forEach(function (li) { setState(li, "pass", "Passed"); });
    total.textContent = items.length + "/" + items.length + " passed";
    card.classList.add("done");
  }

  if (card && items.length) {
    if (reduce) {
      finish();
    } else {
      var step = 0;
      var tick = function () {
        if (step > 0) setState(items[step - 1], "pass", "Passed");
        if (step < items.length) {
          setState(items[step], "running", "Running");
          total.textContent = step + "/" + items.length + " passed";
          step++;
          setTimeout(tick, 650);
        } else {
          finish();
        }
      };
      setTimeout(tick, 500);
    }
  }

  // Copy email
  var copyBtn = document.getElementById("copyEmail");
  var emailLink = document.getElementById("emailLink");
  if (copyBtn && emailLink) {
    copyBtn.addEventListener("click", function () {
      var text = emailLink.textContent.trim();
      var done = function () {
        copyBtn.textContent = "Copied";
        setTimeout(function () { copyBtn.textContent = "Copy"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          window.location.href = "mailto:" + text;
        });
      } else {
        window.location.href = "mailto:" + text;
      }
    });
  }

  // Close the mobile menu after choosing a link
  document.querySelectorAll("#navMenu .nav-link, #navMenu .btn").forEach(function (a) {
    a.addEventListener("click", function () {
      var menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();
