import { useState, useEffect } from 'react';
import { Button, Group, Title } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";
import { BiCaretDown } from "react-icons/bi";

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

  useEffect(() => {
    if (execution) {
      const random = Math.floor(Math.random()*2 + 1)
      setResult({top: random === 1 ? "先": "後", buttom: random === 1 ? "後": "先"})
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
    {execution ? (<Button variant="filled" style={{marginLeft: 20, marginTop: -20}} radius="xl" onClick={() => setExecution(false)}>{"戻る"}</Button>) : <></>}

    <Group justify="center" style={{marginTop: "280px"}} ml="xl" mr="xl">

      {execution ? 
        (
          <>
            <Title style={{fontSize: resultSize, marginTop: "-400px"}}><BiCaretUp size={resultSize} />{result.top}<BiCaretUp size={resultSize} /></Title>
            <Title style={{fontSize: resultSize, marginTop: "160px"}}><BiCaretDown size={resultSize} />{result.buttom}<BiCaretDown size={resultSize} /></Title>
          </>
        ) : (
        <Button
          style={{
            color: colorScheme === "dark" ? "white" : "darkgray"
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
