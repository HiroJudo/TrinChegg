import React from 'react';
import './Questions.css'
import ChegTrin from "../ChegTrin";
import {Input, Breadcrumb, Collapse, Button} from 'antd';
import { Form, Icon} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

const { Panel } = Collapse;
const { TextArea } = Input;


class QuestionForm extends React.Component{

    constructor() {
        super();
        this.state ={
            clName:null,
            questions:[],
            str: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {classId} = this.props.match.params;
        fetch('/api/classes/'+classId)
            .then(res => res.json())
            .then(cl => this.setState({questions: cl.questions,clName:cl.className}));
    };

    handleChange = e => {
        this.setState({str: e.target.value})
    };

    handleSubmit = e => {
        e.preventDefault();
        const { classId } = this.props.match.params;
        axios.post('/api/classes/question/add/'+ classId, {question: {title:this.state.str}})
            .then(res => {console.log('Howdy'); /*this.props.history.push('/classes/' + classId);*/
                window.location = '/classes/' + classId;
            }).catch(err => {console.log(err);})
    };

    render() {
        let {classId} = this.props.match.params;


        return (
            <ChegTrin headernum="1">
                <div className="Question-header">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Link to="/classes">
                            <Breadcrumb.Item>Classes</Breadcrumb.Item>
                        </Link>
                        <Link to={"/classes/"+classId}>
                            <Breadcrumb.Item>{this.state.clName}</Breadcrumb.Item>
                        </Link>
                        <Breadcrumb.Item>Add Question</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="Question-form">
                        <TextArea style={{width: '800px',height:'100px'}} value={this.state.str} onChange={this.handleChange}/>
                        <Button type="primary" htmlType="submit" style={{width: '100px'}}>
                            Submit
                        </Button>
                    </div>
                </form>
            </ChegTrin>
        )
    };
}

export default QuestionForm;