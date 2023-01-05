// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
  // Select the search form and the search results container
  var form = document.getElementById("search-form");
  var container = document.getElementById("search-results");

  // Handle the submit event of the form
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the search title from the form
    var title = form.elements.title.value;
    var title2 = title.replace(/ /g, "+"); // Replace spaces with +
    var results = [];
    var queries = [
      {
        url: `https://www.ncbi.nlm.nih.gov/pmc/?term=${title}`,
        title: "NCBI PMC"
      },
      {
        url: `https://www.biorxiv.org/search/${title}`,
        title: "bioRxiv"
      },
      {
        url: `https://www.medrxiv.org/search/${title}`,
        title: "medRxiv"
      },
      {
        url: `https://www.google.com/search?q=${title2}+filetype:pdf`,
        title: "PDF Search"
      }
    ];
    queries.forEach(function (query) {
    //   fetch(query.url)
    //     .then(function (response) {
    //       return response.text();
    //     })
    //     .then(function (html) {
          // Extract the relevant information
          results.push({
            title: query.title,
            url: query.url
            /* Extract other relevant information */
          });
    //    });
    });

    // Create the search results HTML
    var resultsHTML = "";
    results.forEach(function (result) {
      resultsHTML += `<div class="result">
        <h2><a href="#" data-url="${result.url}">${result.title}</a></h2>
      </div>`;
    });

    // Update the container with the search results HTML
    container.innerHTML = resultsHTML;

    // Handle the click event of the result links
    container.addEventListener("click", function(event) {
      if (event.target.tagName === "A") {
        // Get the URL from the data attribute
        var url = event.target.getAttribute("data-url");
        // Open the URL in a new tab
        window.open(url, "_blank");
      }
    });
  });
});

// Inject the HTML and CSS into the page
var css = document.createElement("style");
css.innerHTML = `
  #search-form {
    font-family: Arial, sans-serif;
    color: #333;
    width: 500px;
    margin: 0 auto;
    text-align: left;
  }
  #search-form label {
    display: block;
    margin-bottom: 5px;
  }
  
  #search-form input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  #search-form .search-button {
    display: block;
    width: 100%;
    padding: 8px;
    background-color: #4caf50;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
  }
  
  #search-form .search-button:hover {
    background-color: #3f9c35;
  }

  #search-results {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Style the search results */
  #search-results a {
    display: block;
    margin: 15px 0;
    padding: 10px;
    border: 3px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    color: #000;
  }

  /* Style the search results on hover */
  #search-results a:hover {
    background-color: #f2f2f2;
  }

`;
document.body.appendChild(css);