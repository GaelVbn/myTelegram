import { View, Text, Pressable } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";

// Définition des types pour User et UserListItemProps
interface User {
  id: string;
  full_name: string;
  // Ajoutez d'autres propriétés si nécessaire
}

interface UserListItemProps {
  user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    if (!me) {
      console.error("Current user is undefined");
      return; // Ajoutez un contrôle pour éviter des erreurs si 'me' est undefined
    }
    const channel = client.channel("messaging", {
      members: [me.id, user.id],
    });
    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 15, backgroundColor: "white" }}
    >
      <Text style={{ fontWeight: "600" }}>{user.full_name}</Text>
    </Pressable>
  );
};

export default UserListItem;

// import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
// import React from "react";
// import { useChatContext } from "stream-chat-expo";
// import { useAuth } from "../providers/AuthProvider";
// import { router } from "expo-router";
// interface User {
//   id: string;
//   full_name: string;
//   // Ajoutez d'autres propriétés si nécessaire
// }
// const UserListItem = ({ user }: { user: User }) => {
//   const { client } = useChatContext();
//   const { user: meUser } = useAuth();

//   if (!meUser) {
//     // Gérer le cas où l'utilisateur n'est pas authentifié
//     return (
//       <Text>
//         Vous devez être authentifié pour utiliser cette fonctionnalité.
//       </Text>
//     );
//   }

//   const onPress = async () => {
//     try {
//       const channel = client.channel("messaging", {
//         members: [meUser.id, user.id],
//       });
//       await channel.watch();
//       router.replace(`/(home)/channel/${channel.cid}`);
//     } catch (error) {
//       console.error("Error creating channel:", error);
//       Alert.alert("Error", "Could not create the channel. Please try again.");
//     }
//   };

//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [styles.container, pressed && styles.pressed]}
//     >
//       <Text style={styles.userName}>{user.full_name}</Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     backgroundColor: "white",
//   },
//   userName: {
//     fontWeight: "600",
//   },
//   pressed: {
//     backgroundColor: "#f0f0f0", // Couleur de fond lorsque l'élément est pressé
//   },
// });

// export default UserListItem;
