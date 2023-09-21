import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import { api } from "../api";

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
  const [user, setUser] = useState({ ...initialUser, id: userId });

  async function loadUser() {
    const response = await api.get(`/users/${userId}`);
    const user = response.data;
    setUser(user);
  }

  useEffect(() => {
    loadUser();
  }, [userId]);

  return (
    <div>
      <AvatarCard {...user} />
      <ProfileCard {...user} />
      <FriendsCard {...user} />
    </div>
  );
}

function AvatarCard({ id, avatar, first_name, last_name }) {
  return (
    <Card>
      <img src={avatar} alt={`Foto de ${first_name}`} />
      <Link
        to={`/perfil/${id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
      >
        {first_name} {last_name}
      </Link>
    </Card>
  );
}

function ProfileCard({ first_name, last_name }) {
  return (
    <Card>
      <h2 className="text-2xl font-bold">
        {first_name} {last_name}
      </h2>
    </Card>
  );
}

const initialFriends = [];

function FriendsCard({ id }) {
  const [friends, setFriends] = useState(initialFriends);

  async function loadFriends() {
    const response = await api.get(`/users/${id}/friends`);
    const friends = response.data;
    setFriends(friends);
  }

  useEffect(() => {
    loadFriends();
  }, [id]);

  return (
    <Card>
      <h2 className="lowercase font-bold">Amigos</h2>
      <div>
        {friends.map((friend) => (
          <div>
            <Link to={`/perfil/${friend.id}`}>
              <img src={friend.avatar} alt={`Foto de ${friend.first_name}`} />
            </Link>
            <Link
              to={`/perfil/${friend.id}`}
              className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
            >
              {friend.first_name} {friend.last_name}
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
