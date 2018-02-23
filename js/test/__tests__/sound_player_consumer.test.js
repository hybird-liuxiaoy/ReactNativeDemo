import SoundPlayer from '../sound_player';
import SoundPlayerConsumer from '../sound_player_consumer';
// jest.mock('../sound_player'); // SoundPlayer is now a mock constructor

const mockPlaySoundFile = jest.fn();
jest.mock('../sound_player', () => {
    return jest.fn().mockImplementation(() => {
        return { playSoundFile: mockPlaySoundFile };
    });
});

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    SoundPlayer.mockClear();
    mockPlaySoundFile.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
    // expect(soundPlayerConsumer).toBeTruthy();
});


it('We can check if the consumer called a method on the class instance', () => {
    // Show that mockClear() is working:
    expect(SoundPlayer).not.toHaveBeenCalled();

    const soundPlayerConsumer = new SoundPlayerConsumer();
    // Constructor should have been called again:
    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    const coolSoundFileName = 'song.mp3';
    soundPlayerConsumer.playSomethingCool();

    // mock.instances is available with automatic mocks:
    const mockSoundPlayerInstance = SoundPlayer.mock.instances[0];
    const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
    expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
    // Equivalent to above check:
    expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
});

describe('When SoundPlayer throws an error', () => {
    beforeAll(() => {
        SoundPlayer.mockImplementation(() => {
            return { playSoundFile: () => { throw new Error('Test error')} };
        });
    });

    it('Should throw an error when calling playSomethingCool', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();
        expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
    });
});
