import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Alert
} from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { FadeTransform } from 'react-animation-components';
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Container>
        <Row className="align-items-center">
          <Col>
            <img src="content/images/headerlogo.png" alt="Logo" height="200px" width="300px" class="img-circle" />
          </Col>
          <Col>
            <h1 class="text-center">Welcome to Rising Arjun</h1>
            {account && account.login ? (
              <div>
                <Alert color="success">
                  <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                    You are logged in as user {account.login}.
                  </Translate>
                </Alert>
              </div>
            ) : (
              <div />
            )}
          </Col>
        </Row>
        <hr />
        <div className="row row-content">
          <div className="col-12 col-md-6 p-4">
            <h2>
              {'\n'}Announcements{'\n'}
            </h2>

            <ListGroup>
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Morbi leo risus</ListGroupItem>
              <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
          </div>

          <div className="col-12 col-md-6 p-4">
            <h2>
              {'\n'}News and Events{'\n'}
            </h2>

            <ListGroup>
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Morbi leo risus</ListGroupItem>
              <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
          </div>
        </div>

        <div class="container-fluid py-2">
          <h2 class="font-weight-light text-center">Offers and Services</h2>
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
            }}
          >
            <div class="d-flex flex-row flex-nowrap justify-content-center">
              <div class="card m-3">
                <h5 class="card-title m-3">IIT-JEE Coaching</h5>
                <div class="card-body">
                  IIT-JEE coaching from VI to XII students and for drop outs. Guest lectures are regularly arranged from corporate
                  professionals who are Alumni of IIT, NITs, KOTA & JNU/DU. We Focus on individual progress to make weak students bright &
                  bright ones as toppers.We follow continuous performance based scholarships.
                </div>
              </div>

              <div class="card m-3">
                <h5 class="card-title m-3">NEET Coaching</h5>
                <div class="card-body">NEET coaching from VII to XII students and for drop outs.</div>
              </div>
            </div>
            <div class="d-flex flex-row flex-nowrap justify-content-center">
              <div class="card m-3">
                <h5 class="card-title m-3">CLAT Coaching</h5>
                <div class="card-body">CLAT Coaching for XI to XII students and drop outs.</div>
              </div>
              <div class="card m-3">
                <h5 class="card-title text-center m-3">All Boards Coaching</h5>
                <div class="card-body ">
                  All boards regular coaching from IV to XII students. Guest lectures are regularly arranged from corporate professionals
                  who are Alumni of IIT, NITs, KOTA & JNU/DU. We Focus on individual progress to make weak students bright & bright ones as
                  toppers.We follow continuous performance based scholarships.
                </div>
              </div>
            </div>
          </FadeTransform>
        </div>

        <div class="container-fluid py-2">
          <h2 class="font-weight-light text-center">Answers and Solutions</h2>
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
            }}
          >
            <div class="d-flex flex-row flex-nowrap justify-content-center">
              <div class="card m-3">
                <div class="card-body">Paper</div>
              </div>

              <div class="card m-3">
                <div class="card-body">Paper</div>
              </div>
              <div class="card m-3">
                <div class="card-body">Paper</div>
              </div>
              <div class="card m-3">
                <div class="card-body">Paper</div>
              </div>
            </div>
          </FadeTransform>
        </div>

        <div style={{ backgroundColor: '#ADD8E6' }} class="jumbotron jumbotron-fluid ">
          <h1 class="display-4 text-center">Results</h1>
          <p class="lead text-center">Student Results</p>
        </div>

        <div class="row">
          <div class="col-12 col-md-12">
            <h2 class="font-weight-light text-center p-3">Testimonials</h2>
          </div>
        </div>

        <div className="row row-content">
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Testimonial title</CardTitle>
                <CardSubtitle>Testimonial subtitle</CardSubtitle>
                <CardText>Sampleinfo</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Testimonial title</CardTitle>
                <CardSubtitle>Testimonial subtitle</CardSubtitle>
                <CardText>Sampleinfo</CardText>
              </CardBody>
            </Card>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-12">
            <h2 class="font-weight-light text-center p-3">Institute Advantages</h2>
          </div>
        </div>

        <div className="row ">
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Advantage title</CardTitle>
                <CardSubtitle>Advantage subtitle</CardSubtitle>
                <CardText>Advantage</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Advantage title</CardTitle>
                <CardSubtitle>Advantage subtitle</CardSubtitle>
                <CardText>Advantage</CardText>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Advantage title</CardTitle>
                <CardSubtitle>Advantage subtitle</CardSubtitle>
                <CardText>Advantage</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card>
              <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
              <CardBody>
                <CardTitle>Advantage title</CardTitle>
                <CardSubtitle>Advantage subtitle</CardSubtitle>
                <CardText>Advantage</CardText>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="row row-content justify-content-center">
          <div className="col-12 col-md-12">
            <div class="card text-white bg-secondary mb-3 card text-center">
              <div class="card-header">ABOUT RISING ARJUN</div>
              <div class="card-body">
                <h5 class="card-title">A Institute with Vision</h5>
                <p class="card-text">
                  Rising Arjun coaching institute was founded by the vision and toil of corporate professionals, Alumnus of MCA from JNU,
                  New Delhi. The founder members have rich experience in giving coaching to school students, and to serious JEE/NEET/CLAT
                  aspirants. We aim to bring the best out of a student the way Guru Dronacharya brought the best in his student Arjuna and
                  made him the best scholar in Indian history who was admired by everyone even by his competitors. Lecturers go beyond
                  merely coaching for regular & competitive classes to make a difference in the way Students think and approach problems.
                  Today, aiming for the unachievable and continuously raising the bar has become a part of the Rising Arjun DNA. The Journey
                  is not over yet. For us at Rising Arjun, The Journey will never be over. For us, this Journey itself is the destination.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-content justify-content-center">
          <div className="col-12 col-md-12 p-4">
            <h2 class="font-weight-light text-center">Map of our location</h2>
            <a href="https://www.google.com/maps/dir//%2728.452499,76.9879394%27">
              <img src="content/images/map.png" alt="Map" width="100%" height="100%" class="p-3" />
            </a>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
