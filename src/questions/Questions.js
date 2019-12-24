import React from 'react';
import './Questions.css'
import ChegTrin from "../ChegTrin";
import {List, Avatar, Breadcrumb, Collapse, Button, Modal, Input} from 'antd';
import {Link} from 'react-router-dom';
import axios from "axios";

const { Panel } = Collapse;
const { TextArea } = Input;

class Questions extends React.Component{

    constructor() {
        super();
        this.state ={
            clName:null,
            questions:[],
            answerModal: false,
            str:"",
            questionId:"",
            questionTitle: "",
        }
    }

    handleChange = e => {
        this.setState({str: e.target.value})
    };

    showModal = (e) => {
        // e.preventDefault();
        console.log(JSON.parse(e.target.value));
        let question = JSON.parse(e.target.value);
        // console.log(e.target.value["_id"]);
        this.setState({
            visible: true,
            questionId: question._id,
            questionTitle: question.title,
        });
    };

    updateAnswers = (id,answer) => {
        let tempArr = this.state.questions;
        for (var i=0; i < tempArr.length; i++) {
            if (tempArr[0]._id = id){
                tempArr[0] = {...tempArr[0], answers: tempArr[0].answers.push({answer:answer})};
            }
        }
        this.setState({questions: tempArr});
    };

    handleOk = e => {
        const { classId } = this.props.match.params;
        axios.post('/api/classes/answers/add/'+ classId + '/' + this.state.questionId, {answer: {answer:this.state.str}})
            .then(
                () => {
                    fetch('/api/classes/'+classId)
                        .then(res => res.json())
                        .then(cl => this.setState({questions: cl.questions,clName:cl.className}))
                }
            ).catch(err => {console.log(err);})
        this.setState({

            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            str:""
        });
    };

    componentDidMount() {
        const {classId} = this.props.match.params;
        fetch('/api/classes/'+classId)
            .then(res => res.json())
            .then(cl => this.setState({questions: cl.questions,clName:cl.className}));
    }

    render() {
        const {classId} = this.props.match.params;

        let panels = this.state.questions.map(
            (question, index) => {
                return (
                    <Panel header={question.title}>
                        <ul>
                        {
                            question.answers.map(
                                (val,i) => <li>{val.answer}</li>
                            )
                        }
                        </ul>
                        <Button type="primary" value={JSON.stringify(question)} onClick={this.showModal}>
                            Add an answer
                        </Button>
                    </Panel>
                );
            }
        );

        return (
            <ChegTrin headernum="1">
                <div className="Question-header">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Link to="/classes">
                        <Breadcrumb.Item>Classes</Breadcrumb.Item>
                        </Link>
                        <Breadcrumb.Item>{this.state.clName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Link to={"/classes/add/questions/"+classId}>
                        <Button type="primary"  style={{marginTop: '10px',marginRight:'20px'}}>
                            Add Question
                        </Button>
                    </Link>
                </div>
                <div className="List-container">
                    <Collapse>
                        {panels}
                    </Collapse>
                </div>
                <Modal
                    title={this.state.questionTitle}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <form onSubmit={this.handleSubmit}>
                        <div className="Question-form">
                            <TextArea style={{width: '800px',height:'100px'}} value={this.state.str} onChange={this.handleChange}/>
                        </div>
                    </form>
                </Modal>
            </ChegTrin>
        )
    };
}

export default Questions;