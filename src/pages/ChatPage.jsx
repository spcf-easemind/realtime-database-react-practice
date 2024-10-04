import {
  Button,
  Divider,
  Flex,
  Title,
  Paper,
  Group,
  Avatar,
  Text,
  Anchor,
} from "@mantine/core";

import ChatButton from "../components/buttons/ChatButton";

import { Outlet } from "react-router-dom";
import { useCallback, useState } from "react";

const data = [
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "rob_wolf@gmail.com",
    role: "Collaborator",
    lastActive: "2 days ago",
    active: true,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "jj@breaker.com",
    role: "Collaborator",
    lastActive: "6 days ago",
    active: true,
  },
];

export default function ChatPage() {
  const [active, setActive] = useState();

  const onClick = useCallback((value) => {
    setActive(value);
  }, []);

  const chatRows = data.map((item) => {
    return (
      <ChatButton
        item={item}
        active={active}
        onClick={onClick}
        key={item.name}
      />
    );
  });

  return (
    <Flex h={"100%"}>
      <Paper
        p="md"
        style={{
          borderRight: "1px solid var(--mantine-color-gray-3)",
        }}
        w={350}
      >
        <Group mb={16}>
          <Title order={2}>Chats</Title>
        </Group>

        {chatRows}
      </Paper>

      <Outlet />
    </Flex>
  );
}
