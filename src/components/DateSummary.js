import moment from 'moment';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

export default function DateSummary({
  fetchedPhotos,
  filteredPhotos,
  activeCamera,
  activeCameraName,
  numberOfFilteredPhotos,
  isLoading,
}) {
  let numberOfImages = 0;
  if (activeCamera.value === 0) {
    numberOfImages = fetchedPhotos.length;
  } else {
    numberOfImages = numberOfFilteredPhotos;
  }

  return (
    <Container className="text-center">
      <div className="date__summary">
        <div className="selected__date">
          {fetchedPhotos.length
            ? moment(fetchedPhotos[0].earth_date).format('MMMM Do, YYYY')
            : ''}
        </div>
        <Row className="returned__details">
          <Col>
            { isLoading ||filteredPhotos.length < 1 ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : fetchedPhotos.length > 0 ? (
              <>
                Images Returned:
                <span className="returned__text">{numberOfImages}</span>
              </>
            ) : (
              <span className="returned__empty">No results</span>
            )}
          </Col>
        </Row>
        <Row className="returned__details">
          <Col>
            {!isLoading && fetchedPhotos.length > 0 ? (
              <>
                Current Camera:{' '}
                <span className="returned__text">
                  {activeCamera.value === 0 ? 'All' : activeCameraName}
                </span>
              </>
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}