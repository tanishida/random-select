import { Group, useMantineColorScheme } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Switch } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const [value, toggle] = useToggle(['dark', 'light']);
  const colorValue = value === "dark" ? "light" : "dark"

  return (
    <Group justify="end" mt="xs" mr="xs">
      <Switch
      size="md"
      color="dark.4"
      onChange={() => {
        setColorScheme(colorValue)
        toggle(colorValue)
      }}
      onLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
      offLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
    />
    </Group>
  );
}
