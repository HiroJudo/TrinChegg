import React from 'react';
import './Questions.css'
import ChegTrin from "../ChegTrin";
import {List, Avatar, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

class Questions extends React.Component{

    constructor() {
        super();
        this.state ={
            clName:null,
            questions:[]
        }
    }

    componentDidMount() {
        const {classId} = this.props.match.params;
        fetch('/api/classes/'+classId)
            .then(res => res.json())
            .then(cl => this.setState({questions: cl.questions,clName:cl.className}));
    }

    render() {

        return (
            <ChegTrin headernum="1">
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Link to="/classes">
                    <Breadcrumb.Item>Classes</Breadcrumb.Item>
                    </Link>
                    <Breadcrumb.Item>{this.state.clName}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="List-container">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.questions}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </ChegTrin>
        )
    };
}

export default Questions;