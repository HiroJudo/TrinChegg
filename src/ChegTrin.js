import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './ChegTrin.css';
import Classes from './classes/Classes';

const { Header, Content, Footer } = Layout;

class ChegTrin extends React.Component{
    render() {
        return (
            <Layout className="layout">
                <Header className="Home-Header">
                    <div>
                        <p className="Home-Title">TrinChegg</p>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.headernum]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">Classes</Menu.Item>
                        <Menu.Item key="2">About</Menu.Item>
                        <Menu.Item key="3">Dashboard</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    };
}

export default ChegTrin;