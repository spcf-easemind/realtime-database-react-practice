import { useEffect, useRef, useState } from "react";

import {
  Box,
  Group,
  Avatar,
  Text,
  ActionIcon,
  Divider,
  Flex,
  ScrollArea,
  TextInput,
  Button,
} from "@mantine/core";

import {
  IconFlag,
  IconInfoCircle,
  IconMoodSmile,
  IconSend2,
} from "@tabler/icons-react";

import { useForm } from "@mantine/form";

import Message from "../components/chatbox/Message";

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
    message: "I am fine, how about you?",
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
    message: "Hello, how are you?",
  },
];

export default function ChatBox() {
  const scrollViewport = useRef(null); // Create a reference for the ScrollArea
  const [chatMessage, setChatMessage] = useState(data);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
      name: "Robert Wolfkisser",
      job: "Engineer",
      email: "rob_wolf@gmail.com",
      role: "Collaborator",
      lastActive: "2 days ago",
      active: true,
      message: "",
    },
    validate: {
      message: null,
    },
  });

  const scrollToBottom = () => {
    if (scrollViewport.current) {
      scrollViewport.current.scrollTo({
        top: scrollViewport.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessage]);

  function handleSubmit(values) {
    setChatMessage((oldMessages) => [...oldMessages, values]); // Add new message to state
    form.reset(); // Reset form after submission
    scrollToBottom();
  }

  const messageInstances = chatMessage.map((item, index) => {
    const flex =
      index % 2 === 1
        ? { justify: "start", direction: "row" }
        : { justify: "end", direction: "row-reverse" };
    return (
      <Message
        key={item.name}
        flex={flex}
        message={item.message}
        avatar={item.avatar}
      />
    );
  });

  return (
    <Flex direction="column" p={16} w="100%" h="100%">
      <Group justify="space-between">
        <Group gap={12}>
          <Avatar
            size={40}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
            radius="xl"
          />
          <div>
            <Text fz="md" fw={500}>
              Robert Wolfkisser
            </Text>
            <Text fz="xs" c="dimmed">
              Last seen now
            </Text>
          </div>
        </Group>

        <Group>
          <ActionIcon variant="transparent" size="lg" radius="xl">
            <IconFlag stroke={2} />
          </ActionIcon>
          <ActionIcon variant="transparent" size="lg" radius="xl">
            <IconInfoCircle stroke={2} />
          </ActionIcon>
        </Group>
      </Group>

      <Divider mt={16} />

      <ScrollArea viewportRef={scrollViewport} flex={1} scrollHideDelay={0}>
        {messageInstances}
      </ScrollArea>

      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Group py="md">
          <ActionIcon variant="transparent" radius="lg">
            <IconMoodSmile stroke={2} />
          </ActionIcon>

          <TextInput
            flex={1}
            variant="filled"
            placeholder="Send Message"
            radius="xl"
            key={form.key("message")}
            {...form.getInputProps("message")}
          />

          <Button type="submit">
            <Group gap={8}>
              <IconSend2 size={20} stroke={2} />
              <div>Message</div>
            </Group>
          </Button>
        </Group>
      </form>
    </Flex>
  );
}
