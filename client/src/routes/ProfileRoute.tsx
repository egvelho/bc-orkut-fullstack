import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../useGlobalStore";
import { api } from "../api";
import { AvatarCard } from "../components/AvatarCard";
import { FriendsCard } from "../components/FriendsCard";
import { ProfileCard } from "../components/ProfileCard";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";

const initialUser = {
  id: 0,
  first_name: "",
  last_name: "",
  created_at: "",
  passwd: "",
  avatar: "",
};

export function ProfileRoute() {
  const params = useParams();
  const userId = params.id;
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const myself = useGlobalStore((state) => state.user);
  const [user, setUser] = useState({ ...initialUser, id: userId });

  async function loadUser() {
    const response = await api.get(`/users/${userId}`);
    const user = response.data;
    setUser(user);
  }

  useEffect(() => {
    loadUser();
  }, [userId]);

  async function addFriend() {
    const response = await api.post(`/users/add-friend/${user.id}`);
    if (response !== undefined) {
      toast("Amigo adicionado com sucesso!");
    }
  }

  async function removeFriend() {
    const response = await api.post(`/users/remove-friend/${user.id}`);
    if (response !== undefined) {
      toast("Amigo removido com sucesso!");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
      <div className="lg:max-w-[192px]">
        <AvatarCard {...user} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {isAuthorized && (
          <div>
            <Button onClick={addFriend}>Adicionar como amigo</Button>
            <Button onClick={removeFriend}>Remover amigo</Button>
          </div>
        )}
        <ProfileCard {...user} />
      </div>
      <div className="lg:max-w-[256px]">
        <FriendsCard {...user} />
      </div>
    </div>
  );
}
