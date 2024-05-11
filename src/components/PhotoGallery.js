import { Container, Row, Col, Card } from "react-bootstrap";

export default function PhotoGallery({ currentFilteredImages }) {
  return (
    <Container>
  <Row xs={1} md={2} lg={4} className="g-4">
    {currentFilteredImages &&
      currentFilteredImages.map((image) => {
        const imgSrc = image.img_src;

        return (
          <Col key={image.id}>
            <Card className="">
              <Card.Img
                
                id={image.id}
                src={imgSrc}
                alt={
                  "Nasa Mars Photo id: " +
                  image.id +
                  " using camera: " +
                  image.camera.full_name +
                  ". Taken on " +
                  image.earth_date
                }
                loading={"lazy"}
              />
            </Card>
          </Col>
        );
      })}
  </Row>
</Container>
  );
}