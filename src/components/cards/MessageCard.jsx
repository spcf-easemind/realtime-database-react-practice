import { Card } from "@mantine/core";

export default function MessageCard({ message }) {
  return (
    <Card padding="sm" withBorder maw={"50%"} radius="lg">
      {message}
    </Card>
  );
}
