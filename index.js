function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()

  $('a#search').on('click', function(){
    event.preventDefault()
    searchRepositories()
  })

  $('#results').on('click', 'a#show_commits', function() {
    event.preventDefault()
    showCommits(this)
  })

});

function searchRepositories() {
  let query = $('#searchTerms').val()

  $.get(`https://api.github.com/search/repositories?q=${query}/`, function(response){
    const src = $('#repository-template').html()
    const template = Handlebars.compile(src)
    const repoList = template(response.items)
    $('#results').html(repoList)
  }).fail(function(){
    displayError()
  })
}

function showCommits(env) {
  let owner = env.dataset.owner
  let repo = env.dataset.repository

  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response){
    const src = $('#commits-template').html()
    const template = Handlebars.compile(src)
    const commitList = template(response)
    $('#details').html(commitList)
  }).fail(function(){
    displayError()
  })
}

function displayError() {
  $('#errors').html("<h1>I'm sorry, there's been an error. Please try again.</h1>")
}

