---
---

// Checkbox filter variables
var allCheckboxes = [];
var checked = {};
var resIds = []; // a list of ids that matches the selected categories

// Pagination variables
var limit = 12; // number of games per page
var currPage = 1; // current page number
var maxPage = 1; // maximum number of pages

window.onload = function () {
    // Get initial checkboxes
    this.allCheckboxes = document.querySelectorAll('.check-box');
    getChecked('selectedGenres');
    getChecked('selectedCourses');
    getChecked('selectedYears');

    // Add event listener to checkboxes
    Array.prototype.forEach.call(this.allCheckboxes, function (el) {
        el.addEventListener('change', toggleCheckbox);
    });

    // Populate resIds with all games
    filterResults();

    // Collapsible containers
    // Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible_symbol
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("expand-content");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
    };
};

// ======================= Filter functions =======================
// Checkbox filter source: https://codepen.io/piotrek/pen/mXpRmQ?editors=1010
function toggleCheckbox(e) {
    getChecked(e.target.name);
    filterResults();
};

function getChecked(name) {
    this.checked[name] = Array.from(
        document.querySelectorAll(
            'input[name=' + name + ']:checked')
        ).map(function (el) {
            return el.value;
    });
};

// Returns true if any category is selected
function isCheckedEmpty() {
    for (const [key, value] of Object.entries(this.checked)) {
        if (value.length > 0) return false;
    };
    return true;
}

function filterResults() {
    this.resIds = [];
    this.currPage = 1;
    
    var id = 0;
    {% for year in site.data.categories.years %}
    {% assign gameYear = "games-" | append: year %}
    {% for game in site.data.all_games[gameYear] %}
    {% capture gid %}{{ game.id }}{% endcapture %}
    {% assign yearString = "" | append: year %}
    {% assign details = site.data.gallery[yearString][gid] %}
    id++;

    if (isCheckedEmpty()) { 
        // simply add the id if no category is checked
        this.resIds.push(id);
    } else { 
        // otherwise filter through the games that match the selected categories
        var details = {{ details | jsonify}};
        var year = {{year}};
        var matchesGenre = this.checked.selectedGenres.length === 0 ||
            this.checked.selectedGenres.some(x => details.genres.includes(x));
        var matchesCourse = this.checked.selectedCourses.length === 0 ||
            this.checked.selectedCourses.includes(details.course.toString());
        var matchesYear = this.checked.selectedYears.length === 0 ||
            this.checked.selectedYears.includes("{{year}}");
        // add to list of resulting ids
        if (matchesGenre && matchesCourse && matchesYear) 
            this.resIds.push(id);
    };
    {% endfor %}
    {% endfor %}

    renderResults();
    setMaxPage();

    // display a message if no games match the selected categories
    var noResults = document.getElementById("no-results");
    if (this.resIds.length === 0) {
        removeClass(noResults, "hidden");
    } else {
        addClass(noResults, "hidden");
    };
};

function renderResults() {
    // Calculate which portion of games should be displayed on the current page
    var start = (this.limit) * (this.currPage - 1);
    var end = ((this.limit) * this.currPage);
    end = end > this.resIds.length ? this.resIds.length : end;
    var resIdPortion = this.resIds.slice(start, end);
    var id = 0;
    {% for year in site.data.categories.years %}
    {% assign gameYear = "games-" | append: year %}
    {% for game in site.data.all_games[gameYear] %}
    id++;
    var gameContainer = document.getElementById(id);
    // Show games that belong to the current page
    if (resIdPortion.includes(id)) {
        removeClass(gameContainer, "hidden");
    } else {
        addClass(gameContainer, "hidden");
    };
    {% endfor %}
    {% endfor %}
}

// ======================= Functions for pagination =======================
function setMaxPage() {
    this.maxPage = Math.ceil(this.resIds.length / this.limit);
    renderPageButtons();
}

function goNextPage() {
    if (this.currPage + 1 <= this.maxPage) {
        this.currPage++;
    };
    renderPageButtons();
    renderResults();
};

function goPrevPage() {
    if (this.currPage - 1 > 0) {
        this.currPage--;
    };
    renderPageButtons();
    renderResults();
};

// Show relevant page buttons
function renderPageButtons() {
    var nextPage = document.getElementById("next-page");
    if (this.currPage < this.maxPage) {
        removeClass(nextPage, "hidden"); // show the next page button
    } else {
        addClass(nextPage, "hidden"); // hide the next page button
    };
    var prevPage = document.getElementById("prev-page");
    if (this.currPage > 1) {
        removeClass(prevPage, "hidden"); // show the previous page button
    } else {
        addClass(prevPage, "hidden"); // hide the previous page button
    };
};

// ========== Functions to remove or add class names to elements ========== 
// Source: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
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
