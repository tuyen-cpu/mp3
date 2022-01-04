const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
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
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [{
            name: "Phố không em",
            singer: "Thái Đinh",
            path: "https://vnso-zn-5-tf-mp3-s1-zmp3.zadn.vn/03026fe7bba352fd0bb2/9168185496329963561?authen=exp=1641400171~acl=/03026fe7bba352fd0bb2/*~hmac=0f368c7ba228d7f449cc1a58981b3bfb&fs=MTY0MTIyNzM3MTkxNHx3ZWJWNnwwfDExMy4xNjYdUngMjMyLjE4MQ",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/7/f/7f2fc838a7e08a2060d0626dd759c701_1514516485.jpg"
        },
        {
            name: "Hết thương cạn nhớ",
            singer: "Đức Phúc",
            path: "https://vnso-zn-23-tf-mp3-s1-zmp3.zadn.vn/729125b300f4e9aab0e5/3341552255942811238?authen=exp=1641400239~acl=/729125b300f4e9aab0e5/*~hmac=7eee98d3f7ba99c8fe7ae8d7c9d00414&fs=MTY0MTIyNzQzOTmUsICxM3x3ZWJWNnwwfDExMy4xNjYdUngOTMdUngNTg",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/9/7/f/a/97fa122b55eefd723d7b97f887ee8786.jpg"
        },
        {
            name: "Đã từng",
            singer: "Bùi Anh Tuấn x Dương Hoàng Yến",
            path: "https://vnso-zn-24-tf-mp3-s1-zmp3.zadn.vn/0b302e232667cf399676/2397390462222726590?authen=exp=1641400351~acl=/0b302e232667cf399676/*~hmac=534cf909adfe767fe29514762f25b1d0&fs=MTY0MTIyNzU1MTY0N3x3ZWJWNnwwfDExMy4xNjYdUngMjMyLjE4MQ",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/8/b/8b6556268f7084e30322337b91e5c2cb_1421640013.jpg"
        },
        {
            name: "24H",
            singer: "LyLy",
            path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zadn.vn/26125d0295467c182557/4987910558067477639?authen=exp=1641399934~acl=/26125d0295467c182557/*~hmac=8a2cf55d9e1c6abd599b2423a062f112&fs=MTY0MTIyNzEzNDk3Nnx3ZWJWNnwxMDAzNDA2MzA1fDI3LjmUsIC4LjI2LjE0Mg",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/c/5/4/d/c54df0e46c902b5b43602c57c2b77df4.jpg"
        },
        {
            name: "Không sao mà, Em đây rồi",
            singer: "Suni Hạ Linh x Lou Hoàng",
            path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zadn.vn/366fa8ff83b86ae633a9/8235770814660146380?authen=exp=1641400413~acl=/366fa8ff83b86ae633a9/*~hmac=1cb809e8d2e769f3549bafd3e092b623&fs=MTY0MTIyNzYxMzE1NXx3ZWJWNnwxMDQzMDkwMjE0fDExNi45OS4xOTgdUngMTM",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/4/8/f/f/48ffdb72c21e5865fa0f2f1f269f0e16.jpg"
        },
        {
            name: "Xe đạp",
            singer: "Thùy Chi x M4U",
            path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zadn.vn/607dd564df20367e6f31/7961013187244538410?authen=exp=1641400594~acl=/607dd564df20367e6f31/*~hmac=2cd1660665948291d91fa241386f18e1&fs=MTY0MTIyNzmUsIC5NDU1NHx3ZWJWNnwwfDExMy4xNjYdUngMjMyLjE4MQ",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/2/0/2083eee4295ae84c7ab510340ff11908_1457321630.jpg"
        },
        {
            name: "Daydreams",
            singer: "Soobin Hoàng Sơn",
            path: "https://vnso-zn-23-tf-mp3-s1-zmp3.zadn.vn/3a687f38ea7c03225a6d/7092920429194289341?authen=exp=1641400287~acl=/3a687f38ea7c03225a6d/*~hmac=b6eefcc1ad5d7e4265a79303bd41b06a&fs=MTY0MTIyNzQ4NzA0MHx3ZWJWNnwwfDExOC42OS4zNS4xMjmUsI",
            image: "https://znews-photo.zadn.vn/w660/Uploaded/qfssu/2021_07_16/avasoo.jpg"
        }
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
                    <div class="song">
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

        console.log(cdThumbAnimate)
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

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
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }

        }
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play();
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }

            audio.play();
        }
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        audio.onended = function() {
            nextBtn.click()
        }
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
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    }

};
app.start();