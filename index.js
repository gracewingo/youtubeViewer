window.onload = addListeners();

function addListeners(){
    const button = document.getElementById('results');
    button.addEventListener("click", getYTubeSearchResults);
}
async function getYTubeSearchResults(){
    const search_term = document.getElementById("search-value").value;
    //let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=process.env.API_KEY?q=life";
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC_AR0qiy1xkfb-kTZBv75RUbE59wc9e30&q=${search_term}`;
    const response = await fetch(url);
    const data = await response.json();
    const video_info = [];
    console.log(data.items)
    data.items.forEach(vid => {
        let obj = {}
        obj.videoID = vid.id.videoId;
        obj.thumbnail = vid.snippet.thumbnails.default
        video_info.push(obj)
    });
    console.log(video_info)
    showYTVideos(video_info);
}

function showYTVideos(videos){
    let output = document.getElementById("output")
    let yURL = "https://www.youtube.com/watch?v"
    //For each Video ID, create a div, and an img, assign src to vid id
    for (let i =0; i < videos.length; i++){
        let div = document.createElement("div");
        let link = document.createElement("a")
        let image = document.createElement("img");
        output.appendChild(div);
        div.appendChild(link);
        link.appendChild(image);
        image.setAttribute("src", videos[i].thumbnail.url)
        link.setAttribute("href", `${yURL}=${videos[i].videoID}`)
        div.setAttribute("class", "video-results");
    }
}