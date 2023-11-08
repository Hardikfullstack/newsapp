import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background: rgb(42 137 124);
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  fontsize: 17px;
  border-radius: 0px 0px 8px 8px;
`;

export const NewsSelect = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const NewsSelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  flex-direction: column;
`;

export const NewsSelectData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  width: 100%;
  h3 {
    width: 20%;
    color: rgb(42 137 124);
  }
`;

export const SaveButton = styled.div`
  width: 100%;
`;

export const Spinner = styled.div`
  width: 100%;
  div {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
`;

export const MessageText = styled.div`
  font-size: 30px;
  margin: 20px 0px;
  width: 100%;
  text-align: center;
`;
