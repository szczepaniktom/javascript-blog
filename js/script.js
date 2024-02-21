const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  optArticleAuthorsSelector = '.post-author';
  optTagsListSelector = '.tags.list';
  optCloudClassCount = '5';
  optCloudClassPrefix = 'tag-size-';
  optAuthorsListSelector = '.authors.list'

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerText;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  addClickListenersToLinks();
}

function addClickListenersToLinks() {
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}


const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999,
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params
}

function calculateTagClass(count, params){
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
  for(let tag of articleTagsArray){
    const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
    html += linkHTML;
    if(!allTags[tag]) {
    allTags[tag] = 1;
  } else {
    allTags[tag]++;
  }
  }

  titleList.innerHTML = html;
  }
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  for(let tag in allTags){
    const tagClass = calculateTagClass(allTags[tag], tagsParams);
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + tagClass + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
  }
    const tagList = document.querySelector(optTagsListSelector);
    tagList.innerHTML = allTagsHTML;
}




function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('.post-tags .list a, .tags.list a');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}



function tagClickHandler (event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active')
  }
  sameHrefTagLinks = document.querySelectorAll('a[href="' + href + '"]')
  for (let tagLink of sameHrefTagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function generateAuthors (){
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const titleList = article.querySelector(optArticleAuthorsSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    const linkHTML = '<a href="#author' + articleAuthor + '"><span>By ' + articleAuthor + '</span></a> ';
    html += linkHTML;
    titleList.innerHTML = html;
  }
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const author = href.replace('#author', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active')
  }
  sameHrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]')
  for (let authorLink of sameHrefAuthorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

document.addEventListener('DOMContentLoaded', function() {
  generateTitleLinks();
  generateTags();
  generateAuthors();
  addClickListenersToLinks();
  addClickListenersToTags();
  addClickListenersToAuthors();
});