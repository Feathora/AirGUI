class VAudioPlayer
{
    audioPlayers:Object;

    constructor()
    {
        this.audioPlayers = {};
    }

    PlaySound(src:string, volume:number = 1.0)
    {
        if(!this.audioPlayers.hasOwnProperty(src))
        {
            let audio = new Audio();
            audio.src = "Resources/Audio/" + src;
            audio.load();

            (this.audioPlayers as any)[src] = audio;
        }

        let player = (this.audioPlayers as any)[src] as HTMLAudioElement;
        player.volume = volume;
        player.play();
    }
}