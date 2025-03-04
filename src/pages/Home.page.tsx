import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Random } from '@/components/Random/Random';
import { Button, Flex, Group, useMantineColorScheme } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <ColorSchemeToggle />
      <Random />      
    </>
  );
}
