import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import BgTriangle from "./images/bgTriangle";
import { FormattedIcons } from "../icons";
import { theme } from "../styles/theme";
import MainContext from "./context/mainContext";

const { colors, fontSizes } = theme;

const StyledContainer = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  position: relative;
  text-align: center;
  max-width: 316px;
  width: 100%;

  & .bgTriangle {
    width: 50%;

    path {
      stroke-width: 26;
    }
  }
`;

const StyledContent = styled.div`
  border: 1px solid green;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2.7em;

  & button {
    position: relative;
  }

  & .Rock {
    margin: 0;
  }
`;

const StyledDescription = styled.p`
  border: 1px solid white;
  color: ${colors.score_background};
  font-size: ${fontSizes.md};
  margin: 30px 0;
  text-transform: uppercase;
`;

const StyledResult = styled.div`
  border: 1px solid yellow;
  margin: 0 auto;
  width: 220px;
`;

const StyledButton = styled.button`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 130px;
  justify-content: center;
  position: absolute;
  width: 130px;
  transition: all 0.3s ease;
  user-select: none;

  &.Paper {
    border: 14px solid ${colors.paper_gradientB};
    box-shadow: 0px 8px ${colors.paper_gradientA},
      inset 0px 5px ${colors.lightGrayishBlue};
    top: 0;
  }

  &.Scissor {
    border: 14px solid ${colors.scissor_gradientB};
    box-shadow: 0px 8px ${colors.scissor_gradientA},
      inset 0px 5px ${colors.lightGrayishBlue};
    right: 0;
    top: 0;
  }

  &.Rock {
    border: 14px solid ${colors.rock_gradientB};
    box-shadow: 0px 8px ${colors.rock_gradientA},
      inset 0px 5px ${colors.lightGrayishBlue};
    bottom: 0;
    left: 0;
    margin: auto;
    right: 0;
  }

  &:active {
    box-shadow: none;
    transform: translateY(8px);
  }
`;

const StyledTitle = styled.h1`
  color: ${colors.score_background};
  font-size: ${fontSizes.xxl};
  letter-spacing: 2px;
  margin: 0;
  text-transform: uppercase;
`;

const StyledButtonBack = styled.button`
  border-radius: 10px;
  color: ${colors.dark_text};
  font-size: ${fontSizes.md};
  font-weight: 600;
  letter-spacing: 2px;
  margin-top: 25px;
  padding: 15px;
  text-transform: uppercase;
  width: 100%;
`;

const Demo = () => {
  const {
    you_picked,
    house_picked,
    compare,
    result,
    getYouPicked,
    getHousePicked,
    getCompare,
    getResult,
  } = useContext(MainContext);

  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const items = ["Paper", "Scissor", "Rock"];

  const randomItem = items[random(0, 3)];

  const runDemo = (e) => {
    getYouPicked(items[parseFloat(e.currentTarget.value)]);

    getHousePicked(randomItem);

    getResult(items[parseFloat(e.currentTarget.value)], randomItem);

    getCompare(true);
  };

  const data = [
    {
      name: "Paper",
      value: 0,
    },
    {
      name: "Scissor",
      value: 1,
    },
    {
      name: "Rock",
      value: 2,
    },
  ];

  return (
    <StyledContainer>
      {compare ? (
        <StyledContent>
          <div>
            <StyledButton className={you_picked.name} name={you_picked.name}>
              <FormattedIcons name={you_picked.name} />
            </StyledButton>
            <StyledDescription>You picked</StyledDescription>
          </div>

          <div>
            <StyledButton
              className={house_picked.name}
              name={house_picked.name}
            >
              <FormattedIcons name={house_picked.name} />
            </StyledButton>

            <StyledDescription>The house picked</StyledDescription>
          </div>

          <StyledResult>
            <StyledTitle>{result}</StyledTitle>

            <StyledButtonBack onClick={() => getCompare(false)}>
              Play again
            </StyledButtonBack>
          </StyledResult>
        </StyledContent>
      ) : (
        <>
          <BgTriangle />

          {data.map((item, i) => (
            <StyledButton
              className={item.name}
              key={i}
              name={item.name}
              onClick={runDemo}
              value={item.value}
            >
              <FormattedIcons name={item.name} />
            </StyledButton>
          ))}
        </>
      )}
    </StyledContainer>
  );
};

export default Demo;
