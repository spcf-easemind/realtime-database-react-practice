import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import {
  createUserAtFirebase,
  signInUserAtFirebase,
} from "../utils/authentication";

export default function LoginPage() {
  const navigate = useNavigate();
  const [createStatus, setCreateStatus] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should be at least 6 characters long"
          : null,
    },
  });

  function createUser(user) {
    try {
      createUserAtFirebase(user);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  }

  function signInUser(user) {
    try {
      signInUserAtFirebase(user);
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  }

  const submitFunction = (user) =>
    createStatus ? createUser(user) : signInUser(user);

  return (
    <Container h={"100vh"}>
      <Flex justify="center" align="center" h="100%">
        <Box w={420}>
          <Title ta="center">Welcome back!</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {createStatus
              ? "Already have an account? "
              : "Do not have an account yet? "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => setCreateStatus((oldVal) => !oldVal)}
            >
              {createStatus ? "Sign in" : "Create account"}
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(submitFunction)}>
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                key={form.key("password")}
                {...form.getInputProps("password")}
                mt="md"
              />
              <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">
                {createStatus ? "Create account" : "Sign in"}
              </Button>
            </form>
          </Paper>
        </Box>
      </Flex>
    </Container>
  );
}
