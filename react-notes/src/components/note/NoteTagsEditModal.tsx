import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../../App";

type TagsEditProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

export function NoteTagsEditModal({ availableTags, show, handleClose, updateTag, deleteTag }: TagsEditProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} onChange={(e) => updateTag(tag.id, e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button onClick={() => deleteTag(tag.id)} variant="outline-danger">
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
