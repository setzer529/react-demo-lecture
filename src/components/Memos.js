import {Badge, Button, Col, Row, Card, Modal, Form} from 'react-bootstrap';
import {useState} from 'react'

function Memos({handleLogoutRequest, handleCreateMemo, handleDeleteMemo, memos}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [content, setMemoText] = useState('');
    const [memoTags, setTags] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        console.log({content, memoTags});
        const tags = memoTags.split(',')
        handleCreateMemo({content, tags});
        handleClose();
    }

    // function handleDelete() {
    //     console.log(event.target.value);
    //     handleDeleteMemo(event.target.value.id, event.target.value.timestamp);
    // }

    function handleTextChange(event) {
        setMemoText(event.target.value)
    }

    function handleTagsChange(event) {
        setTags(event.target.value)
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Memo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="createMemo">
                            <Form.Label>New Memo: </Form.Label>
                            <Form.Control type="text" placeholder="Memo" onChange={handleTextChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTags">
                            <Form.Label>Tags: </Form.Label>
                            <Form.Control type="text" placeholder="Tag1, Tag2" onChange={handleTagsChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            <Row>
                <Col><h1>WELCOME!!!</h1></Col>
                <Col xs='auto'>
                    <Button onClick={handleShow}>New</Button>
                </Col>
                <Col xs='auto'>
                    <Button variant='outline-primary' onClick={handleLogoutRequest}>Logout</Button>
                </Col>
            </Row>
            <Row>
                {
                    memos.map(memo => {
                        return (
                            <Card style={{width: '18rem'}} key={memo.id}>
                            <Card.Header>
                                <Button onClick={() => handleDeleteMemo(memo)}>DELETE!!!</Button>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle>
                                    {memo.create_timestamp.slice(0, 16).replace('T', ' ')}
                                </Card.Subtitle>
                                {memo.content}
                            </Card.Body>
                            <Card.Footer>
                                {memo.tags ? memo.tags.map(tag => {
                                    return (<Badge className={'m-2'}>{tag}</Badge>)
                                }) : console.log('No tags')}
                            </Card.Footer>
                        </Card>)
                    })

                }
                {/*<Card style={{width: '18rem'}}>*/}

                {/*    <Card.Body>*/}
                {/*        <Placeholder as={Card.Title} animation="glow">*/}
                {/*            <Placeholder xs={6}/>*/}
                {/*        </Placeholder>*/}
                {/*        <Placeholder as={Card.Text} animation="glow">*/}
                {/*            <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}*/}
                {/*            <Placeholder xs={6}/> <Placeholder xs={8}/>*/}
                {/*        </Placeholder>*/}

                {/*    </Card.Body>*/}
                {/*    <Card.Footer className="text-muted">FOOTER</Card.Footer>*/}
                {/*</Card>*/}
            </Row>


        </>
    );
}

export default Memos;