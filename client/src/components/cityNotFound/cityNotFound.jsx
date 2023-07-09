import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 20px;
`;

const Image = styled.img`
  width: 600px;
  height: auto;
  margin-top: 20px;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4287f5;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2962c2;
  }
`;

const CityNotFound = () => {
  return (
    <NotFoundContainer>
      <Title>La ciudad no existe</Title>
      <Image src={'https://static.vecteezy.com/system/resources/previews/014/332/208/non_2x/find-search-view-error-abstract-circle-background-flat-color-icon-free-vector.jpg'} alt="City Not Found" />
      <RetryButton onClick={() => window.location.reload()}>Volver a intentar</RetryButton>
    </NotFoundContainer>
  );
};

export default CityNotFound;
