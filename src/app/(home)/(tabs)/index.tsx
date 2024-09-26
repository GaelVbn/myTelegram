import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { useState } from "react";
import { Text } from "react-native";
import { Channel as ChannelType } from "stream-chat";
import { router, useRouter } from "expo-router";

export default function MainTabScreen() {
  return (
    <ChannelList
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
}
