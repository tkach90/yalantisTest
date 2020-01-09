import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;    
  width: 100px;
  height: 60px;
  margin: 5px;
  border-radius: 6px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3), 
      -3px -3px 6px rgba(255, 255, 255, 0.3), 
      inset 2px 2px 5px rgba(255, 255, 255, 0.3), 
      inset -2px -2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 200ms ease-in-out;
`;

const MonthWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;  
    justify-content: center;
    
    div {
        display: flex;
        justify-content: center;
        align-items: center;    
        width: 100px;
        height: 60px;
        margin: 5px;
        border-radius: 6px;
        box-shadow: 3px 3px 6px rgba(255, 255, 255, 0.3), 
              -3px -3px 6px rgba(0, 0, 0, 0.3), 
              inset 2px 2px 5px rgba(0, 0, 0, 0.3), 
              inset -2px -2px 5px rgba(255, 255, 255, 0.3);    
        
 
        &:hover ${Box} {
          transform: translate(10px, 5px) rotate(10deg);
        }      
    }
    
    .red {
      background: red;
      color: #fff;
    }
    
    .green {
      background: green;
      color: #fff;
    }
    
    .blue {
      background: blue;
      color: #fff;
    }
    
    .gray {
      background: gray;
      color: #fff;
    }
`;

const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto 0;
  justify-content: center;
  width: 40%;
  padding: 3px 10px 3px;
  border-radius: 10px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3), 
              -3px -3px 6px rgba(255, 255, 255, 0.3), 
              inset 2px 2px 5px rgba(255, 255, 255, 0.3), 
              inset -2px -2px 5px rgba(0, 0, 0, 0.3);
`;

export { GlobalStyle, UsersWrapper, MonthWrapper, Box };