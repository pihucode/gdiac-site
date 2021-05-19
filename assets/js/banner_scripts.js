var prevBanner = 1;
var currBanner = 2;
var nextBanner = 3;

function prevFeatured(banners, baseurl) {
  nextBanner = currBanner;
  currBanner = prevBanner;
  prevBanner -= 1;
  var banners = banners.trim().split(" ");
  // console.log(banners);
  if( prevBanner < 0){
      prevBanner = banners.length - 1;
  }
  document.getElementById("featured-left-img").src = baseurl + "/gallery/" + banners[prevBanner] + "/banner.png"
  document.getElementById("featured-center-img").src = baseurl + "/gallery/" + banners[currBanner] + "/banner.png"
  document.getElementById("featured-right-img").src = baseurl + "/gallery/" + banners[nextBanner] + "/banner.png"
  document.getElementById("featured-left").href = baseurl + "/gallery/" + banners[prevBanner];
  document.getElementById("featured-center").href = baseurl + "/gallery/" + banners[currBanner];
  document.getElementById("featured-right").href = baseurl + "/gallery/" + banners[nextBanner];
}

function nextFeatured(banners, baseurl) {
  prevBanner = currBanner;
  currBanner = nextBanner;
  nextBanner += 1;
  var banners = banners.trim().split(" ");
  // console.log(banners);
  if( nextBanner >= banners.length){
      nextBanner = 0;
  }
  document.getElementById("featured-left-img").src = baseurl + "/gallery/" + banners[prevBanner] + "/banner.png";
  document.getElementById("featured-center-img").src = baseurl + "/gallery/" + banners[currBanner] + "/banner.png";
  document.getElementById("featured-right-img").src = baseurl + "/gallery/" + banners[nextBanner] + "/banner.png";
  document.getElementById("featured-left").href = baseurl + "/gallery/" + banners[prevBanner];
  document.getElementById("featured-center").href = baseurl + "/gallery/" + banners[currBanner];
  document.getElementById("featured-right").href = baseurl + "/gallery/" + banners[nextBanner];
}
