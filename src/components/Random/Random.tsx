import { useState, useEffect } from 'react';
import { Button, Group, Title } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";
import { GiAxeSword } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import { CloseButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Grid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

export const Random = () => {
  const [execution, setExecution] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState<{fromColor: string; toColor: string}>({fromColor: "", toColor: ""})
  const [deg, setDeg] = useState<number>(0);
  const colorScheme = useColorScheme();
  const [result, setResult] = useState<{top: string, buttom: string}>({top: "", buttom: ""})
  // const defColors = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal']
  const interval = 2000;
  const iconSize = 70;
  const resultSize = "4rem"
  const isMobile = useMediaQuery(`(max-width: 590px)`);
  const { height, width } = useViewportSize();
  
  useEffect(() => {
    if (execution) {
      const random = Math.floor(Math.random()*2 + 1)
      setResult({top: random === 1 ? "先攻": "後攻", buttom: random === 1 ? "後攻": "先攻"})
    }

  }, [execution])

  useEffect(() => {
    const fromRandom = [Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random()]
    const toRandom = [Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random()]  
    const fromColor = `rgba(${fromRandom[0]}, ${fromRandom[1]}, ${fromRandom[2]}, ${fromRandom[3]})`
    const toColor = `rgba(${toRandom[0]}, ${toRandom[1]}, ${toRandom[2]}, ${toRandom[3]})`
    const deg = Math.random() * 360;
    setDeg(deg)
    setColor({fromColor: fromColor, toColor})
  
  }, [execution])

  return (
    <>
    {execution ? (
      <CloseButton 
        style={{marginLeft: 10, marginTop: -20}} 
        size="xl"
        onClick={() => setExecution(false)}
      >
      </CloseButton>
    ) : <></>}

    <Group justify="center">

      {execution ? 
        (
          <Grid>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <Title 
                style={{
                  fontSize: resultSize,
                  transform: "scale(-1.5)",
                  textAlign: "center"
                }}
              >
                <GiAxeSword size={resultSize} />
                  {result.top}
                <GiCheckedShield size={resultSize} />
              </Title>
              <Title 
                style={{
                  fontSize: resultSize, 
                  transform: "scale(1.5)", 
                  marginTop: height > 730 ? height > 1000 ? height > 1200  ? "57rem" : "40rem" : "30rem" : "20rem",
                  textAlign: "center"
                }}
                >
                  <GiAxeSword size={resultSize} />
                    {result.buttom}
                  <GiCheckedShield size={resultSize} />
              </Title>
            </Grid.Col>
            <Grid.Col></Grid.Col>
          </Grid>
        ) : (
        <Button
          style={{
            color: colorScheme === "dark" ? "white" : "darkgray",
            marginRight: 10,
            marginLeft: 10,
            marginTop: "20rem"

          }}
          leftSection={<BiSolidChevronLeft size={iconSize} />}
          rightSection={<BiSolidChevronRight size={iconSize} />}
          size="xl"
          fullWidth
          autoContrast
          loading={loading}
          variant="gradient"
          gradient={{ from: color.fromColor, to: color.toColor, deg: deg }}
          onClick={() => 
            {
              setLoading(true);
              setTimeout(() => {
                setExecution(true)
                setLoading(false);
              }, interval)
            }
          }
        >
          <Title style={{fontSize: "35px"}}>{"START!"}</Title>
        </Button>
      )}
      
    </Group>
    </>
  );
}
