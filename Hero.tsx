import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const Hero = () => {
  return (
    <section className="position-relative overflow-hidden bg-dark pt-8 pt-lg-10 pb-7">
      <div className="position-absolute top-0 end-0 opacity-25">
        <div
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0, 180, 255, 0.35), transparent 65%)',
          }}
        />
      </div>

      <Container className="position-relative">
        <Row className="align-items-center min-vh-75">
          <Col lg={7} className="mb-5 mb-lg-0">
            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-4">
              Digital Agency • Design • Development • Growth
            </span>

            <h1 className="display-3 fw-bold text-white mb-4">
              Design.
              <br />
              Develop.
              <br />
              <span className="text-primary">Grow.</span>
            </h1>

            <p className="lead text-white-50 mb-4 pe-lg-5">
              Code &amp; Motions is a full-service digital agency helping
              businesses build powerful websites, custom software, Shopify
              stores, creative visuals, and digital growth strategies.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Button
                variant="primary"
                href="/contact"
                className="icon-link icon-link-hover px-4 py-3"
              >
                Start a Project
                <IconifyIcon icon="bi:arrow-right" />
              </Button>

              <Button
                variant="outline-light"
                href="/services"
                className="px-4 py-3"
              >
                Explore Services
              </Button>
            </div>
          </Col>

          <Col lg={5}>
            <div
              className="position-relative rounded-4 p-4 p-lg-5"
              style={{
                minHeight: '420px',
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="position-absolute top-50 start-50 translate-middle text-center w-100 px-4">
                <div className="display-4 fw-bold text-white mb-3">
                  Code &amp; Motions
                </div>

                <p className="text-white-50 mb-4">
                  One team for design, technology and digital growth.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {[
                    'Software',
                    'Web',
                    'Shopify',
                    'Animation',
                    'Design',
                    'SEO',
                  ].map((item) => (
                    <span
                      key={item}
                      className="badge rounded-pill bg-white bg-opacity-10 text-white px-3 py-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero