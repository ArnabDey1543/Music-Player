
// Convert audio mp3
// Go to this link https://base64.guru/converter/encode/audio/mp3

//  in depth explanation https://youtu.be/VXWvfrmpapI

// Select elements
const audioFile = document.querySelector('.audioupload');
const content = document.querySelector('.content');
const canvas = document.querySelector('canvas');
// Create a new audio context
const audioContext = new AudioContext();

const music = document.querySelector("audio");
      const img = document.querySelector("img");
      const play = document.getElementById("play");
      const artist = document.getElementById("artist");
      const title = document.getElementById("title");
      const prev = document.getElementById("prev");
      const next = document.getElementById("next");

      const songs = [
        {
          name: "Numb&Frozen",
          title: "Numb & Frozen",
          artist: "Icy Narco",
        },
        {
          name: "Fantasy",
          title: "Fantasy",
          artist: "Bazzi",
        },
        {
          name: "LeaveMeAlone",
          title: "Leave Me Alone",
          artist: "NF",
        },
      ];

      let isPlaying = false;
      // for play
      const plauMusic = () => {
        isPlaying = true;
        music.play();
        play.classList.replace("fa-play", "fa-pause");
        img.classList.add("anime");
      };
      // for pause
      const pauseMusic = () => {
        isPlaying = false;
        music.pause();
        play.classList.replace("fa-pause", "fa-play");
        img.classList.remove("anime");
      };

      play.addEventListener("click", () => {
        // if(isPlaying){
        //     pauseMusic();
        // }
        // else{
        //     plauMusic();
        // }
        isPlaying ? pauseMusic() : plauMusic();
    });
    
    //   changing the music data
    const loadSong = (songs) => {
        title.textContent = songs.title;
        artist.textContent = songs.artist;
        music.src = `music/${songs.name}.mp3`;
        img.src = `assets/${songs.name}.jpg`;
        drawBars(music);
      };

      songIndex = 0;

      const nextSong = () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);
        plauMusic();
      };

      const prevSong = () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songs[songIndex]);
        plauMusic();
      };

      next.addEventListener("click", nextSong);
      prev.addEventListener("click", prevSong);

// Canvas width and height
canvas.width = (window.innerWidth * 75 / 100);
canvas.height = (window.innerHeight * 60 / 100);
// Set canvas 2d context
const canvasCtx = canvas.getContext('2d');

// // File upload event listener
// audioFile.addEventListener('change', function(){
//     // console.log(this.files);
//     // Select audio player
//     const audioPlayer = document.querySelector('audio');
//     // Set the audio source
//     audioPlayer.src = URL.createObjectURL(this.files[0]);
//     // Update audio source with method load
//     audioPlayer.load();
//     // Play audio
//     audioPlayer.play();
//     // Animation function
//     drawBars(audioPlayer);
// });

// Animate Fc
function drawBars (audio){
        // Set audio Source
        audioSource = audioContext.createMediaElementSource(audio);
        // Create the Analyzer
        analyzer = audioContext.createAnalyser();
        // Connect audio to the analyzer to obtain audio data
        audioSource.connect(analyzer);
        // Connect analyzer to the default audio device, pc speakers
        analyzer.connect(audioContext.destination);
        analyzer.fftSize = 128; // this can be 32 64 128 256 512 1024 etc
    
        // Analyzer data
        let bufferLength = analyzer.frequencyBinCount;
    
        // Create a Uint8 Array
        const dataUint8Array = new Uint8Array(bufferLength);
    
        // Draw Bar width and height
        let barWidth = canvas.width / bufferLength;
        let barHeight;
        let x = 0;

        // Animation
        function animate() {
            x = 0;
            // Clear canvas first
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height); // x y width height
            // Get Bytes
            analyzer.getByteFrequencyData(dataUint8Array);
            // For loop change the bar height
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataUint8Array[i] * 1.5;
                // Change bar with random color
                let r = Math.floor(Math.random() * (i*barHeight/20));
                let g = Math.floor(Math.random() * (i));
                let b = Math.floor(Math.random() * (i * barHeight/5));
                // Fill color
                canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
                // Draw canvas rectangle
                canvasCtx.fillRect( x, canvas.height - barHeight, barWidth, barHeight); // x y width height
                // Change x bar position
                x += barWidth + 2;
            };
            // Recall Animation
            requestAnimationFrame(animate);
        }
        // Call animation
        animate();
};

// if you want more information and explanations in depth please look at the work of franks laboratory
// https://youtu.be/VXWvfrmpapI