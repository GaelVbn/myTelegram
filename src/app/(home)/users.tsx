import { FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import UserListItem from "../../components/UserListItem";

// Définition de l'interface pour les utilisateurs
interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string; // Ajouter d'autres propriétés selon votre modèle
}

export default function UsersScreen() {
  const [users, setUsers] = useState<UserProfile[]>([]); // Spécifiez le type d'état
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return; // Vérifiez que 'user' est défini

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id);

      if (error) {
        console.error("Error fetching users:", error);
        return; // Gérer l'erreur si nécessaire
      }

      setUsers(profiles || []); // Assurez-vous que 'profiles' n'est pas null
    };

    fetchUsers();
  }, [user]); // Ajoutez 'user' comme dépendance pour l'effet

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}

// import { FlatList, Text, ActivityIndicator, View } from "react-native";
// import { useEffect, useState } from "react";
// import { supabase } from "../../lib/supabase";
// import { useAuth } from "../../providers/AuthProvider";
// import UserListItem from "../../components/UserListItem";

// // Définir un type pour les utilisateurs (ou profils)
// type UserProfile = {
//   id: string;
//   username: string;
//   full_name: string;

//   // Ajoutez d'autres champs selon votre schéma de profil
// };

// export default function UsersScreen() {
//   const [users, setUsers] = useState<UserProfile[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!user) {
//         setError("User not authenticated");
//         setLoading(false);
//         return;
//       }

//       const { data: profiles, error: fetchError } = await supabase
//         .from("profiles")
//         .select("*")
//         .neq("id", user.id);

//       if (fetchError) {
//         console.error("Error fetching users:", fetchError.message);
//         setError(fetchError.message);
//       } else {
//         setUsers(profiles);
//       }
//       setLoading(false);
//     };

//     fetchUsers();
//   }, []); // Ajoutez `user` comme dépendance

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={users}
//       renderItem={({ item }) => <UserListItem user={item} />}
//     />
//   );
// }
