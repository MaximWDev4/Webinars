import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  @Input() url: string = '9az99oQS6HM';
  event: MouseEvent;
  clientX = 0;
  player;
  playerVars = {
    cc_lang_pref: 'en',
    controls: 0,
    rel: 0,
    autoplay: 1,
    allow_full_screen: 0
  };
  timePercent: number;
  private savedVolume: number;
  private startTime: number;
  private playerLoadedTime: number;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  playerInit(player): void {
    this.player = player;
    this.savedVolume = +localStorage.getItem('sV');
    this.timeP();
    this.player.setVolume(this.savedVolume);
    const loadedCheckInterval = setInterval(() => {
      if (this.player.getVideoLoadedFraction() > 0.1)
      {
        this.startTime = this.player.getCurrentTime();
        clearInterval(loadedCheckInterval);
        console.log(this.startTime);
        this.playerLoadedTime = Date.now();
      }
    }, 200);
  }

  get currentTime(): string{
    const hours = Math.floor(this.player.getCurrentTime() / 3600);
    const minets = Math.floor(this.player.getCurrentTime() % 3600 / 60);
    const seconds = Math.floor(this.player.getCurrentTime() % 60);
    return `${hours}:${minets}:${seconds}`;
  }

  get duration(): number{
    if (this.startTime > 1) {
      return this.player.getDuration() - (this.player.getDuration() - this.startTime) + (Date.now() - this.playerLoadedTime) / 1000 ;
    }
    return this.player.getDuration();
  }

  get endTime(): string {
    const hours = Math.floor(this.duration / 3600);
    const minets = Math.floor(this.duration % 3600 / 60);
    const seconds = Math.floor(this.duration % 60);
    return `${hours}:${minets}:${seconds}`;
  }

  get soundPercent(): number {
    return this.player.getVolume();
  }

  get playerState(): boolean {
    if (this.player) {
      if (this.player.getPlayerState() === -1 || this.player.getPlayerState() === 0
        || this.player.getPlayerState() === 2 || this.player.getPlayerState() === 5) {
        return false;
      }
      if (this.player.getPlayerState() === 1) {
        return true;
      }
    }
    return false;
  }
  timeP(): void {
    setInterval(() =>
    {
      this.timePercent =  Math.floor(this.player.getCurrentTime() * 100) / this.duration;
      this.cdr.detectChanges();
    },
      1000);
  }

  onEvent(event: MouseEvent): void {
    this.event = event;
  }
  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX ;
  }
  selectTime(length, x): void{
    this.goTo( (((this.clientX - x.getBoundingClientRect().x) * 100) / length) * (this.duration / 100) );
    console.log(this.player.getCurrentTime(), this.duration );
  }
  setVlolume(length, x): void{
    localStorage.setItem('sV', this.player.getVolume());
    this.player.setVolume((((this.clientX - x.getBoundingClientRect().x) * 100) / length));
  }
  playPauseVideo(): void {
    if (!this.playerState) {
      this.player.playVideo();
    }
    if (this.playerState) {
      this.player.pauseVideo();
    }
  }
  mute(): void{
    if (this.player.getVolume() !== 0) {
      this.player.mute();
    } else {
      this.player.unMute();
    }
  }
  goTo(second): void {
      this.player.seekTo(second, true);
    }
}
