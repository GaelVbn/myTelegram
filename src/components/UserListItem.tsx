import { View, Text } from "react-native";
import React, { FC } from "react";
import { User } from "stream-chat-expo";

interface User {
  full_name: string;
  // add other properties of the user object if needed
}

const UserListItem: FC<{ user: User }> = ({ user }) => {
  return (
    <View style={{ padding: 15, backgroundColor: "white" }}>
      <Text style={{ fontWeight: "600" }}>{user.full_name}</Text>
    </View>
  );
};

export default UserListItem;
