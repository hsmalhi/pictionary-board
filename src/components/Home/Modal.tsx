import { Modal, Carousel } from "react-bootstrap";
import React from "react";

function MyVerticallyCenteredModal(props: any) {    
  return (
    <React.Fragment>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Carousel>
          <Carousel.Item>
            <Modal.Title className="modal-title">Room Setup</Modal.Title>
            <Modal.Body>
              <div className="grid-container">
                <div className="grid-item left-item">
                  <img
                    className="modal-pic"
                    src="https://pngimage.net/wp-content/uploads/2018/06/laptop-doodle-png-6.png"
                    title="Laptop"
                    alt="Laptop"
                  />
                </div>
                <div className="grid-item left-item">
                  <img
                    className="modal-pic"
                    src="https://static.vecteezy.com/system/resources/previews/000/608/456/non_2x/vector-hand-holding-smartphone.jpg"
                    title="Mobile phone"
                    alt="Mobile phone"
                  />
                </div>
                <div className="grid-item">
                  <img
                    className="modal-pic"
                    src="https://www.pnglot.com/pngfile/detail/197-1972632_drawn-smiley-face-png-whatsapp-logo-png.png"
                    title="smile"
                    alt="smile"
                  />
                </div>
                <div className="grid-item grid-text left-item">Create room and share the code</div>
                <div className="grid-item grid-text left-item">Have everyone visit this site and join on their phone</div>
                <div className="grid-item grid-text">Have fun!</div>
                
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>

          </Carousel.Item>
          <Carousel.Item>
            <Modal.Title className="modal-title">You will either be DRAWING or GUESSING</Modal.Title>
            <Modal.Body>
              <div className="grid-container-2">
                <div className="grid-item left-item">
                  <img
                    className="modal-pic"
                    src="https://i.imgur.com/QHMbUsj.png"
                    title="Laptop"
                    alt="Laptop"
                  />
                </div>
                <div className="grid-item">
                  <img
                    className="modal-pic"
                    src="https://i.imgur.com/u3LXdz8.png"
                    title="Mobile phone"
                    alt="Mobile phone"
                  />
                </div>
                <div className="grid-item grid-text left-item">Two people will be drawing at once so work together!</div>
                <div className="grid-item grid-text">Try to use the number of letters to guess!</div>
              </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer"></Modal.Footer>
          </Carousel.Item>
        </Carousel>
      </Modal>
    </React.Fragment>
  );
}

export default MyVerticallyCenteredModal;
