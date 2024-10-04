import { Group, Text, Avatar, UnstyledButton } from "@mantine/core";
import classes from "./ChatButton.module.css";

export default function ChatButton({ item, active, onClick }) {

  function handleClick(event, name) {
    event.preventDefault();
    onClick(name);
  }

  return (
    <UnstyledButton
      onClick={(event) => handleClick(event, item.name)}
      component="a"
      href="/chat/user"
      className={classes.user}
      data-active={item.name === active || undefined}
      px="sm"
    >
      <Group gap="sm">
        <Avatar size={40} src={item.avatar} radius="xl" />
        <div>
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
          <Text fz="xs" c="dimmed">
            {item.email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
