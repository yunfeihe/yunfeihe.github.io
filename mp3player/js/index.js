"use strict"

let qS = function(selector){
    return document.querySelector(selector);
};

let qSA = function(selector){
    return document.querySelectorAll(selector);
};

let bind = function(element, eventName, f){
    element.addEventListener(eventName, f);
};

let log = function(){
    console.log.apply(console, arguments);
};

let main = function(){
    log("start");

    bindings();

    setInterval(() => {
        player.updateProgressBar();
        player.updateTime();
    }, 1000)
};

let Player = function(){
    this.albumImage = qS(".album img");
    this.min = qS("#id-span-min");
    this.sec = qS("#id-span-sec");
    this.songTitle = qS("#id-span-title");
    this.artist = qS("#id-span-artist");
    this.fillBar = qS("#id-div-fill");
    this.player = qS("#id-audio-player");
};

Player.prototype.play = function(song){
    log("play", song.title, song.artist);
    let newSong = 0;
    if(this.player.currentTime === newSong){
        this.setAlbumImage(song.album);
        this.setSong(song.url);
        this.setTitleAndArtist(song.title, song.artist);
    }
    this.player.play();
};

Player.prototype.setAlbumImage = function(url){
    this.albumImage.src = url;
};

Player.prototype.setSong = function(url){
    this.player.src = url;
};

Player.prototype.setTitleAndArtist = function(title, artist){
    this.songTitle.textContent = title;
    this.artist.textContent = artist;
};

Player.prototype.pause = function(){
    log("pause")
    this.player.pause();
};

Player.prototype.updateProgressBar = function(){
    let duration = this.player.duration;
    let current = this.player.currentTime;
    let progress = current / duration;
    this.fillBar.style.width = `${progress * 100}%`;
};

Player.prototype.updateTime = function(){
    let min = Math.floor(this.player.currentTime / 60);
    let sec =  Math.round(this.player.currentTime % 60);
    if(String(sec).length === 1){
        sec = "0" + sec;
    }
    this.min.textContent = min;
    this.sec.textContent = sec;
};

let bindings = function(){
    log("bindings over")
    let playBtn = qS("#id-i-play");
    let stopBtn = qS("#id-i-pause");
    bind(playBtn, "click", (e) => {
        player.play(
            {
                album: "http://pic.xiami.net/images/album/img7/58507/3599371470901228.jpg",
                artist: "Pianoboy",
                url: "./demo.mp3",
                title: "The Truth That You Leave",
            }
        );
    });
    bind(stopBtn, "click", (e) => {
        player.pause();
    });

};



let player = new Player();

main()