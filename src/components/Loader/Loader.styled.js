import styled from 'styled-components';

const StyledLoader = styled.div`
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  /*change these sizes to fit into your project*/
  width: 25px;
  height: 25px;

  & hr {
    border: 0;
    margin: 0;
    width: 40%;
    height: 40%;
    position: absolute;
    border-radius: 50%;
    animation: spin 2s ease infinite;
  }

  & :first-child {
    background: #19a68c;
    animation-delay: -1.5s;
  }

  & :nth-child(2) {
    background: #f63d3a;
    animation-delay: -1s;
  }

  & :nth-child(3) {
    background: #fda543;
    animation-delay: -0.5s;
  }

  & :last-child {
    background: #193b48;
  }

  @keyframes spin {
    0%,
    100% {
      transform: translate(0);
    }

    25% {
      transform: translate(160%);
    }

    50% {
      transform: translate(160%, 160%);
    }

    75% {
      transform: translate(0, 160%);
    }
  }
`;

export default StyledLoader;
