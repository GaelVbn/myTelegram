import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthContext = {
  session: Session | null;
  user: User | undefined; // Modifiez ici pour permettre 'undefined'
  profile: any | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  user: undefined, // Assurez-vous que la valeur par défaut est 'undefined'
  profile: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null); // Ajoutez le type `any` ou remplacez par un type spécifique si vous avez un type pour les profils.

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, user: session?.user, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// import {
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { Session, User } from "@supabase/supabase-js";
// import { supabase } from "../lib/supabase";

// // Définir un type pour le profil
// type Profile = {
//   id: string;
//   username: string;
//   full_name: string;
//   website: string;
//   avatar_url: string;

//   // Ajoutez d'autres champs selon votre schéma de profil
// };

// type AuthContextType = {
//   session: Session | null;
//   user: User | undefined;
//   profile: Profile | null;
// };

// const AuthContext = createContext<AuthContextType>({
//   session: null,
//   user: undefined,
//   profile: null,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setSession(session);
//     };

//     fetchSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       subscription?.unsubscribe(); // Nettoyer l'abonnement lors du démontage
//     };
//   }, []);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!session?.user) {
//         setProfile(null);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("profiles") // Assurez-vous que 'profiles' est bien typé
//         .select("*")
//         .eq("id", session.user.id)
//         .single();

//       if (error) {
//         console.error("Error fetching profile:", error.message);
//         setProfile(null); // Vous pouvez aussi gérer l'erreur différemment
//       } else {
//         setProfile(data);
//       }
//     };

//     fetchProfile();
//   }, [session?.user]);

//   return (
//     <AuthContext.Provider value={{ session, user: session?.user, profile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
