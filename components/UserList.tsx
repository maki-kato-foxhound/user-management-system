import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { User } from "../types/User";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [list, setList] = useState<User[]>(users);
  useEffect(() => setList(users), [users]);

  const handleDeleted = (deletedId: number) => {
    setList((prev) => prev.filter((user) => user.id !== deletedId));
  };

  if (users.length === 0) {
    return <p>ユーザーがいません。</p>;
  }

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
