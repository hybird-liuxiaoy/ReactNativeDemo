import SoundPlayer from './sound_player';

export default class SoundPlayerConsumer {
    constructor() {
        this.soundPlayer = new SoundPlayer();
    }

    playSomethingCool() {
        const coolSoundFileName = 'song.mp3';
        this.soundPlayer.playSoundFile(coolSoundFileName);
    }
}
