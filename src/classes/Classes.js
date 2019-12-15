import React from 'react';
import {Breadcrumb, Card} from 'antd';
import './Classes.css'
import ChegTrin from "../ChegTrin";

class Classes extends React.Component{

    constructor() {
        super();
        this.state ={
            classes:[]
        }
    }

    componentDidMount() {
        fetch('/api/classes')
            .then(res => res.json())
            .then(classes => this.setState({classes}));
    }

    render() {
        let class_cards = this.state.classes.map((value,index) =>
                <div className="Card-Wrapper" >
                    <Card title={value.className} extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Teacher: {value.prof}</p>
                        <p>Term: {value.term}</p>
                    </Card>
                </div>
            );

        return (
            <ChegTrin headernum="1">
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Classes</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, minHeight: 600 }}>
                    <div className="Classes-Wrapper">
                        {class_cards}
                    </div>
                </div>
            </ChegTrin>
        )
    };
}

export default Classes;