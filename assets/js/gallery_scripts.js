---
---

// checkbox filter code source: https://codepen.io/piotrek/pen/mXpRmQ?editors=1010
var allCheckboxes = [];
var checked = {};

window.onload = function () {
    // Get initial checkboxes
    allCheckboxes = document.querySelectorAll('.check-box');
    getChecked('selectedGenres');
    getChecked('selectedYears');
    getChecked('selectedCourses');

    // Add event listener to checkboxes
    Array.prototype.forEach.call(allCheckboxes, function (el) {
        el.addEventListener('change', toggleCheckbox);
    });
};

function toggleCheckbox(e) {
    getChecked(e.target.name);
    filterResults();
};

function getChecked(name) {
    checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
        return el.value;
    });
};

function filterResults() {
    var id = 0;
    {% for game in site.data.showcase %}
    {% capture gid %}{{ game.id }}{% endcapture %}
    {% assign details = site.data.gallery["2020"][gid] %}

    var details = {{ details | jsonify}};
    var gameContainer = document.getElementById(++id);

    var matchesGenre = checked.selectedGenres.length == 0 ||
        checked.selectedGenres.some(x => details.genres.includes(x));
    var matchesCourse = checked.selectedCourses.length == 0 ||
        checked.selectedCourses.includes(details.course.toString());

    // Hide classes that do not match selected options
    if (matchesGenre && matchesCourse) {
        removeClass(gameContainer, "hidden");
    } else {
        addClass(gameContainer, "hidden");
    };
    {% endfor %}
};

// Code source: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
};

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};