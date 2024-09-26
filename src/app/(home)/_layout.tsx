import { Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { Text } from "react-native"; // Importer Text pour le rendu de texte

const client = StreamChat.getInstance("vdzsayuwtgvk");

export default function HomeLayout() {
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "JDoe",
          name: "John Doe",
          image: "https://getstream.io/random_png/?id=1&name=1",
        },
        client.devToken("JDoe")
      );
    };
    connect();
  }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}
