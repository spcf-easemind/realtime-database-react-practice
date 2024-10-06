import { Flex, Avatar } from "@mantine/core";

import MessageCard from "../cards/MessageCard";

export default function Message({ flex, avatar, message }) {
  return (
    <Flex
      pt="sm"
      justify={flex.justify}
      align="end"
      gap={16}
      direction={flex.direction}
    >
      <Avatar src={avatar} />
      <MessageCard message={message}/>
    </Flex>
  );
}
