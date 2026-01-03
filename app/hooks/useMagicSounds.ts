// Web Audio API hook for magical sound effects
export const useMagicSounds = () => {
  const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) => {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playSelectSound = () => {
    if (!audioContext) return;
    // Magical chime - ascending arpeggio
    playTone(523.25, 0.15, 'sine', 0.2); // C5
    setTimeout(() => playTone(659.25, 0.15, 'sine', 0.2), 50); // E5
    setTimeout(() => playTone(783.99, 0.2, 'sine', 0.15), 100); // G5
  };

  const playDeselectSound = () => {
    if (!audioContext) return;
    // Descending tone
    playTone(392, 0.15, 'sine', 0.15); // G4
    setTimeout(() => playTone(329.63, 0.2, 'sine', 0.1), 60); // E4
  };

  const playRevealSound = () => {
    if (!audioContext) return;
    // Magical reveal - dramatic ascending with sparkle
    const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.3, 'sine', 0.25 - i * 0.02), i * 80);
    });
    // Add shimmer effect
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => playTone(1200 + Math.random() * 800, 0.1, 'sine', 0.1), i * 50);
      }
    }, 400);
  };

  return { playSelectSound, playDeselectSound, playRevealSound };
};
