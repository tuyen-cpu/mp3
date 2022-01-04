const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'music-app'
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [{
            name: "Phố không em",
            singer: "Thái Đinh",
            path: "./assets/audio/phokhongem.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/7/f/7f2fc838a7e08a2060d0626dd759c701_1514516485.jpg"
        },
        {
            name: "Hết thương cạn nhớ",
            singer: "Đức Phúc",
            path: "./assets/audio/hetthuongcannho.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/7/f/a/97fa122b55eefd723d7b97f887ee8786.jpg"
        },
        {
            name: "Đã từng",
            singer: "Bùi Anh Tuấn x Dương Hoàng Yến",
            path: "./assets/audio/datung.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/8/b/8b6556268f7084e30322337b91e5c2cb_1421640013.jpg"
        },
        {
            name: "24H",
            singer: "LyLy",
            path: "./assets/audio/24h.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/c/5/4/d/c54df0e46c902b5b43602c57c2b77df4.jpg"
        },
        {
            name: "Không sao mà, Em đây rồi",
            singer: "Suni Hạ Linh x Lou Hoàng",
            path: "./assets/audio/khongsaomaemdayma.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/4/8/f/f/48ffdb72c21e5865fa0f2f1f269f0e16.jpg"
        },
        {
            name: "Xe đạp",
            singer: "Thùy Chi x M4U",
            path: "./assets/audio/xedap.mp3",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/2/0/2083eee4295ae84c7ab510340ff11908_1457321630.jpg"
        },
        {
            name: "Daydreams",
            singer: "Soobin Hoàng Sơn",
            path: "./assets/audio/daydreams.mp3",
            image: "https://znews-photo.zadn.vn/w660/Uploaded/qfssu/2021_07_16/avasoo.jpg"
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                    <div class="song ${index===this.currentIndex?'active':''}" data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop;
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            }
            //when click play btn
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play();

        }
        audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause();
            }
            //  the time bar automatically changes according to the song time
        audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent;
                }

            }
            // when click  any time on time bar 
        progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
            }
            //when click next song
        nextBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.randomSong()
                } else {
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollActiveSong()
            }
            //when click prev song
        prevBtn.onclick = function() {
                if (_this.isRandom) {
                    _this.randomSong()
                } else {
                    _this.prevSong()
                }

                audio.play()
                _this.render()
                _this.scrollActiveSong()
            }
            // on off random when next or prev click
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // on off repeat song when ended song
        repeatBtn.onclick = function(e) {
                _this.isRepeat = !_this.isRepeat
                _this.setConfig('isRepeat', _this.isRepeat)
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }
            //when ended song auto next song
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()

            }
        }
        playlist.onclick = function(e) {
            const songElement = e.target.closest('.song:not(.active)')
            if (songElement || e.target.closest('.option')) {
                if (songElement) {
                    _this.currentIndex = Number(songElement.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }
    },
    scrollActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            }, 400)
        })
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()

    },
    start: function() {
        this.loadConfig()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }

};
app.start();