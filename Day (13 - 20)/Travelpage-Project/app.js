let heroContent = document.getElementById("discover-content");
console.log(heroContent.innerHTML);

heroContent.innerHTML = ` <h1>My Travel Page</h1>
<p>Let's Explore the World together!</p>
<a href="/places.html">Discover More</a>` +
'<p>Added through JavaScript</p>'


