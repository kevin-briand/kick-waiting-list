import React, { useCallback, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

export type YTAProps = {
  id: string;
  startSeconds: number;
  durationSeconds: number;
  play: number;
};

export function YTA({ id, startSeconds, durationSeconds, play }: YTAProps) {
  const playerRef = useRef<any>(null);
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timer>();

  const autoStop = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      playerRef.current.internalPlayer.pauseVideo();
    }, durationSeconds * 1000);
  };

  const start = useCallback(() => {
    if (
      play &&
      playerRef.current &&
      playerRef.current.internalPlayer &&
      playerRef.current.internalPlayer.playVideo &&
      playerRef.current.internalPlayer.seekTo
    ) {
      playerRef.current.internalPlayer.seekTo(startSeconds);
      playerRef.current.internalPlayer.playVideo();
    }
  }, [play, startSeconds]);

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    playerRef.current.internalPlayer.getPlayerState().then((state: number) => {
      if ([0, 2].includes(state)) start();
      return state;
    });
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [play, start]);

  return (
    <YouTube
      videoId={id}
      ref={playerRef}
      onStateChange={(event) => {
        if (event.data === 5) start();
      }}
      onPlay={autoStop}
      style={{ display: 'none' }}
    />
  );
}
