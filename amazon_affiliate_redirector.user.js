// ==UserScript==
// @name          Amazon Affiliate Redirector
// @namespace     
// @description   Plugs Amazon Links To A Designated Affiliate
// @include       *
// @run-at        document-end
// @version       2.0
// ==/UserScript==

// Define Your Affiliate ID (Or Leave Mine In!)
var affID = 'thmydoli-20';

// Get The Amazon Product ID
function getASIN(href) {
  var asinMatch;
  asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
  if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
  if (!asinMatch) { return null; }
  return asinMatch[1];
}

// Get The Domain
function getDomain() {
  if (document.location.hostname.substr(0,4) == 'www.') {
    return document.location.hostname.substr(4) ;
  }
  return document.location.hostname ;
}

// The Main Function
(function() {

  // Scope
  var asin = '';
  var currentDomain = getDomain();
  var linkDomain = (currentDomain.match(/amazon\./i) ? currentDomain : "amazon.com");

  // Get All Of Our Links And Loop
  var allLinks = document.getElementsByTagName("a");
  for (i = 0; i < allLinks.length; i++) {
    var href = allLinks[i].href;
    if (href.match(/amazon\./i)) {
      asin = getASIN(href);
      if (asin != null) {
        allLinks[i].setAttribute("href", "http://"+linkDomain+"/o/ASIN/" + asin + "/ref=nosim/"+affID);
      }
    }
  }
})();
