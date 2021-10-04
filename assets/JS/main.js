const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const music = $('.body__music');
const cd = $('.header__info--img');
const cdWidth = cd.offsetWidth;
const cdHeight = cd.offsetHeight;
const heading = $('.header__name--song');
const audio = $('#audio');
const playBtn = $('.btn-play-stop');
const progress = $('.header__progress--input');
const seek_start = $('.header__progress--start');
const seek_end = $('.header__progress--end');
const next_song = $('.btn-next');
const prev_song = $('.btn-back');
const random_song = $('.btn-random');
const repeat_song =$('.btn-loop');
const PLAYER_STORAGE_KEY ='MUSIC_PLAYER'
const app= {
      currentIndex : 0 ,
      isPlay : false ,
      isRandom : false,
      isRepeat : false,
      config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
      songs:[
      {
            name: 'Khúc Cửu Môn Hồi Ức' ,
            singer: 'Đặng Thập Ma Quân',
            path:'./assets/music/song_khuccuumonhoiuc.mp3',
            image:'./assets/image/img.khuccuumonhoiuc.jpg'

      },
      {
            name:"Hôm Nay Em Cưới Rồi",
            singer:"Khải Đăng",
            path:"./assets/music/song_homnayemcuoiroi.mp3",
            image:'./assets/image/img.homnayemcuoiroi.jpg'
      },
      {
            name: 'Cao Ốc 20' ,
            singer: 'Bray , Đạt G',
            path:'./assets/music/song_caooc20.mp3',
            image:'./assets/image/img.caooc20.jpg'

      },
      {
            name: 'Đi Về Phía Thinh Lặng' ,
            singer: 'Bùi Anh Tuấn , Orange',
            path:'./assets/music/song_divephiathinhlang.mp3',
            image:'./assets/image/img.divephiathinhlang.jpg'

      },      
      {
            name: 'Khách Mời / 嘉宾' ,
            singer: 'Trương Viễn (Zhang Yuan)',
            path:'./assets/music/song_khachmoi.mp3',
            image:'./assets/image/img.khachmoi.jpg'

      },
      {
            name:"Cưới Thôi",
            singer:"Masew , Bray , TAP",
            path:"./assets/music/song_cuoithoi.mp3",
            image:'./assets/image/img.cuoithoi.jpg'
      },
      {
            name: 'Gặp Gỡ , Yêu Đương Và Được Bên EM' ,
            singer: 'Phan Mạnh Quỳnh',
            path:'./assets/music/song_gapgyeuduongvaduocbenem.mp3',
            image:'./assets/image/img.gapgoyeuduongvaduocbenem.jpg'

      },
      {
            name: 'Thuận Theo Ý Trời' ,
            singer: 'Bùi Anh Tuấn',
            path:'./assets/music/song_thuantheoytroi.mp3',
            image:'./assets/image/img.thuantheoytroi.jpg'

      },    
      {
            name: 'Tháng Mấy Em Nhớ Anh' ,
            singer: 'Hà Anh Tuấn',
            path:'./assets/music/song_thangmayemnhoanh.mp3',
            image:'./assets/image/img.thangmayemnhoanh.jpg'

      },
      {
            name:"Chân Ái",
            singer:"Orange , Khói",
            path:"./assets/music/song_chanai.mp3",
            image:'./assets/image/img.chanai.jpg'
      },
      {
            name: 'Demons' ,
            singer: 'ImagineDragons',
            path:'./assets/music/song_demons.mp3',
            image:'./assets/image/img.Demons.jpg'

      },
      {
            name: 'Waiting For Love' ,
            singer: 'Avicii',
            path:'./assets/music/song_waitingforlove.mp3',
            image:'./assets/image/img.waitingforlove.jpg'

      },    

            ],
      setConfig : function(key , value){
            this.config[key] = value;
            localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
      },
      render: function(){
            const htmls = this.songs.map((song,index) =>{
                  return `
                  <div class="body__music--item ${index == this.currentIndex ? 'active' : ''}" data-index=${index}>
                        <img src="${song.image}" alt="">
                         <div class="body__music--info ">
                               <h3 class="body__music--name">${song.name}</h3>
                               <p class="body__music--singer">${song.singer}</p>
                         </div>
                         <div class="body__music--options">
                               <i class="ti-more"></i>
                        </div>
                </div>`
            })
            music.innerHTML = htmls.join('');
      },
      defineProperties:function(){
            Object.defineProperty(this , 'currentSong',{
                  get : function(){
                        return this.songs[this.currentIndex]
                  }
            })
      },
      loadCurrentSong : function(){
            heading.textContent = this.currentSong.name;
            cd.src = this.currentSong.image;
            audio.src = this.currentSong.path;

      },
      loadConfig : function(){
            this.isRandom = this.config.isRandom;
            this.isRepeat = this.config.isRepeat;

      },
      handleEvent:function(){
            const _this = this;
            document.onscroll = function(){
                   const scroll = window.scrollY || document.documentElement.scrollTop ;
                   const newCDWidth = cdWidth - scroll ;
                   const newCDHeight = cdHeight - scroll ;
                   cd.style.width=newCDWidth>0?newCDWidth +"px":0;
                   cd.style.opacity = newCDWidth / cdWidth;
                   cd.style.height=newCDHeight > 0 ? newCDHeight +"px" : 0;
            }
            // Xử lí khi kích play
            playBtn.onclick = function(){
                  if(audio.paused){
                        audio.play();
                        $('.ti-control-play').className='ti-control-pause';
                        _this.isPlay = true;
                        cdAnimate.play();
                  }
                  else{
                        audio.pause();
                        $('.ti-control-pause').className ='ti-control-play';
                        _this.isPlay = false;
                        cdAnimate.pause();
                  }

            }
            // tiến độ bài hát
            audio.ontimeupdate = function(){
                  if(audio.duration){
                        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                        progress.value = progressPercent;
                        seek_start.textContent = _this.mathTime(audio.currentTime);//trả về thời gian âm thanh hiện tại
                        seek_end.textContent = _this.mathTime(audio.duration);// trả về tổng thời gian âm thanh

                  }
                  // console.log(audio.currentTime / audio.duration * 100);
            }
            // xử lí tua song
            progress.onchange = function(e){
                  const seekTime = audio.duration / 100 * e.target.value ;
                  audio.currentTime = seekTime;
                  // console.log(audio.duration / 100 * e.target.value);
            }
            // xử lí quay cd
            const cdAnimate = cd.animate([
                  { transform: 'rotate(360deg)'}
            ],{
                  duration: 10000,
                  iterations : Infinity
            })
            cdAnimate.pause();
            // next song
            next_song.onclick = function(){
                  if(_this.isRandom){
                        _this.randomSong();
                  }
                  else{
                        _this.nextSong()
                  }
                  if(_this.isPlay==true){
                        audio.play();
                  }
                  _this.render();
                  _this.scrollActiveSong();
                  
            }
            // prev song
            prev_song.onclick = function(){
                  if(_this.isRandom){
                        _this.randomSong();
                  }
                  else{
                        _this.prevSong()
                  }
                  if(_this.isPlay==true){
                        audio.play();
                  }
                  _this.render();
                  _this.scrollActiveSong();
            }
            // random
            random_song.onclick = function(e){
                  _this.isRandom = !_this.isRandom
                  _this.setConfig('isRandom',_this.isRandom);
                  random_song.classList.toggle('active__btn',_this.isRandom);
            }
            // xử lí lặp lại 1 song
            repeat_song.onclick = function(e){
                  _this.isRepeat = !_this.isRepeat
                  _this.setConfig('isRepeat',_this.isRepeat);
                  repeat_song.classList.toggle('active__btn',_this.isRepeat);
            }  
            // next when audio ended
            audio.onended = function(){
                  // cách 1
                  // if(_this.isRandom){
                  //       _this.randomSong();
                  // }
                  // else{
                  //       _this.nextSong()
                  // }
                  // if(_this.isPlay==true){
                  //       audio.play();
                  // }
                  if(_this.isRepeat){
                        audio.play()
                  }else{
                        next_song.click();
                  }
            }
            music.onclick = function(e){
                  const nodeSong =e.target.closest('.body__music--item:not(.active)');
                  if(nodeSong || e.target.closest('.body__music--options')){
                        // xử lí click vào song
                        if(nodeSong){
                              _this.currentIndex = Number(nodeSong.dataset.index)
                              _this.loadCurrentSong();
                              _this.render();
                              audio.play();
                              if(_this.isPlay==false){
                                    $(".ti-control-play").className="ti-control-pause";
                                    _this.isPlay=true;
                                }
            
                        }
                  };
            }

      },
      scrollActiveSong:function(){
            setTimeout(()=>{
                  $('.body__music--item.active').scrollIntoView({
                        behavior : 'smooth' ,
                        block    : 'center',
                  });
            },300)
      },
      nextSong:function(){
            this.currentIndex++
            if(this.currentIndex >= this.songs.length ){
                  this.currentIndex = 0;
            }
            this.loadCurrentSong()
      },
      prevSong:function(){
            this.currentIndex--
            if(this.currentIndex <0 ){
                  this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong()
      },
      randomSong:function(){
            let newIndex;
            do{
                  newIndex = Math.floor(Math.random()*this.songs.length);
            }while(newIndex === this.currentIndex);
            this.currentIndex = newIndex;
            this.loadCurrentSong();
      }
      ,
      mathTime(time){
            const minutes=Math.floor(time/59);
            const second=Math.round(time%59);
            return`0${minutes}:${second.toString=second<10 ?'0'+second:second}`;
        },
    
      start: function(){
            // Gán cấu hình từ config vào app
            this.loadConfig();
            //xử lý dom event
            this.handleEvent()
            //định nghĩa các thuộc tính cho object
            this.defineProperties()
            //render playlist
            this.render()
            // load bài hát đầu tiên khi vào
            this.loadCurrentSong();

            // hiển thị radom and repeat ở trạng thái đầu
            random_song.classList.toggle('active__btn',this.isRandom);
            repeat_song.classList.toggle('active__btn',this.isRepeat);
      }
}

      app.start();
