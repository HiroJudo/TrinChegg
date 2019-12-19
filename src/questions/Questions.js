import React from 'react';
import './Questions.css'
import ChegTrin from "../ChegTrin";
import {List, Avatar, Breadcrumb, Collapse, Button} from 'antd';
import {Link} from 'react-router-dom';

const { Panel } = Collapse;

class Questions extends React.Component{

    constructor() {
        super();
        this.state ={
            clName:null,
            questions:[],
        }
    }

    componentDidMount() {
        const {classId} = this.props.match.params;
        fetch('/api/classes/'+classId)
            .then(res => res.json())
            .then(cl => this.setState({questions: cl.questions,clName:cl.className}));
    }

    render() {
        const {classId} = this.props.match.params;

        let panels = this.state.questions.map(
            (value, index) => {
                return (
                    <Panel header={value.title}>
                        <ul>
                        {
                            value.answers.map(
                                (val,i) => <li>{val.answer}</li>
                            )
                        }
                        </ul>
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
            </ChegTrin>
        )
    };
}

export default Questions;