"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import "@livekit/components-styles";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) {
      return;
    }

    const getToken = async () => {
      try {
        const response = await axios("/api/livekit", {
          params: {
            room: chatId,
            username: `${user.firstName} ${user.lastName}`,
          },
        });
        const { token } = response.data;
        setToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    getToken();
  }, [user?.firstName, user?.lastName, chatId, setToken]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
