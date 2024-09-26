import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || "defaultApiKey";

const client = StreamChat.getInstance(apiKey);
export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) return;
    const connect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: "https://getstream.io/random_png/?id=1&name=1",
        },
        client.devToken(profile.id)
      );
      setIsReady(true);
    };
    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }

      setIsReady(false);
    };
  }, [profile?.id]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
