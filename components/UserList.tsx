import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { User } from "../types/User";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [list, setList] = useState<User[]>(users);
  useEffect(() => setList(users), [users]);// 更新と同期

  const handleDeleted = (deletedId: number) => {
    setList((prev) => prev.filter((user) => user.id !== deletedId));
  };

  if (users.length === 0) {
    return <p>ユーザーがいません。</p>;
  }

  return (
    <div>
      {list.map(user => (
        <div key={user.id} style={{ marginBottom: 12 }}>
          <UserCard user={user} onDelete={handleDeleted} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
